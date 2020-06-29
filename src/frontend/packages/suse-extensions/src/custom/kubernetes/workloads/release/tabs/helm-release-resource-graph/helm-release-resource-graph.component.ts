import { Metadata } from './../../../../store/kube.types';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import { SidePanelService } from 'frontend/packages/core/src/shared/services/side-panel.service';
import { BehaviorSubject, Observable, Subscription, Subject, combineLatest } from 'rxjs';
import { filter, first, map, startWith, distinctUntilChanged, tap } from 'rxjs/operators';

import {
  KubernetesResourceViewerComponent,
} from '../../../../kubernetes-resource-viewer/kubernetes-resource-viewer.component';
import { KubeAPIResource } from '../../../../store/kube.types';
import { HelmReleaseHelperService } from '../helm-release-helper.service';
import { KubernetesAnalysisService } from '../../../../services/kubernetes.analysis.service';
import { ResourceAlertLevel } from '../../../../services/analysis-report.types';


interface Colors {
  bg: string;
  fg: string;
}

const layouts = [
  'dagre',
  'd3ForceDirected',
  'colaForceDirected'
];

@Component({
  selector: 'app-helm-release-resource-graph',
  templateUrl: './helm-release-resource-graph.component.html',
  styleUrls: ['./helm-release-resource-graph.component.scss']
})
export class HelmReleaseResourceGraphComponent implements OnInit, OnDestroy {

  // see: https://swimlane.github.io/ngx-graph/#/#quick-start

  public nodes: Node[] = [];
  public links: Edge[] = [];

  update$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  fit$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public layout = 'dagre';

  public layoutIndex = 0;

  private graph: Subscription;

  path: string;

  // Cached analysis report
  private analysisReport;

  private analysisReportUpdated = new Subject<string>();
  private analysisReportUpdated$ = this.analysisReportUpdated.pipe(startWith(null), distinctUntilChanged());

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public helper: HelmReleaseHelperService,
    private previewPanel: SidePanelService,
    public analyzerService: KubernetesAnalysisService,
  ) {
    this.path = `${this.helper.namespace}/${this.helper.releaseTitle}`;
  }

  ngOnInit() {
    // Listen for the graph
    const obs = combineLatest(
      this.helper.fetchReleaseGraph(),
      this.analysisReportUpdated$
    );
    this.graph = obs.subscribe(([g, a]) => {
      const newNodes = [];
      Object.values(g.nodes).forEach((node: any) => {
        const colors = this.getColor(node.data.status);
        newNodes.push({
          id: node.id,
          label: node.label,
          data: {
            ...node.data,
            fill: colors.bg,
            text: colors.fg
          },
        });
      });
      this.nodes = newNodes;
      if (this.analysisReport) {
        const alerts = this.remapAlertMetadata(this.analysisReport.alerts);
        this.nodes.forEach(node => {
          if (alerts[node.id.toLowerCase()]) {
            node.data.alerts = alerts[node.id.toLowerCase()];
            node.data.alertSummary = this.calculateAlertSummary(node.data.alerts);
          }
        });
      }

      const newLinks = [];
      Object.values(g.links).forEach((link: any) => {
        newLinks.push({
          id: link.id,
          label: link.id,
          source: link.source,
          target: link.target
        });
      });
      this.links = newLinks;
      this.update$.next(true);
    });
  }

  private remapAlertMetadata(alerts) {
    const result = {};
    Object.keys(alerts).forEach(group => {
      alerts[group].forEach(alert => {
        const key = `${alert.kind}-${alert.name}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(alert);
      });
    });

    return result;
  }

  ngOnDestroy() {
    if (this.graph) {
      this.graph.unsubscribe();
    }
  }

  // Open side panel when node is clicked
  public onNodeClick(node: any) {
    this.previewPanel.show(
      KubernetesResourceViewerComponent,
      {
        title: node.label,
        resource$: this.getResource(node),
        analysis: this.analysisReport,
      },
      this.componentFactoryResolver
    );
  }

  public fitGraph() {
    this.fit$.next(true);
  }

  public toggleLayout() {
    this.layoutIndex++;
    if (this.layoutIndex === layouts.length) {
      this.layoutIndex = 0;
    }

    this.layout = layouts[this.layoutIndex];
  }

  private getColor(status: string): Colors {
    switch (status) {
      case 'error':
        return {
          bg: 'red',
          fg: 'white'
        };
      case 'ok':
        return {
          bg: 'green',
          fg: 'white'
        };
      case 'warn':
        return {
          bg: 'orange',
          fg: 'white'
        };
      default:
        return {
          bg: '#5a9cb0',
          fg: 'white'
        };
    }
  }

  private getResource(node: any): Observable<KubeAPIResource> {
    return this.helper.fetchReleaseResources().pipe(
      filter(r => !!r),
      map((r: any[]) => {
        let kind = node.data.kind;
        let name = node.label;

        // If its a container its more complicated as this is not an actual k8s resource
        if (kind === 'Container') {
          kind = 'Pod';
          // label and id
          const index = node.id.indexOf(node.label);
          if (index > 0) {
             // Remove one extra char for the '-' seperator
            name = node.id.substr(0, index - 1);
          }
          if (node.id.endsWith(node.label)) {
            name = node.id.substr(0, node.id.length - node.label.length - 1);
            // Remove the 'Pod-' prefix
            name = name.substr(4);
          }
        }

        let resource = Object.values(r).find((res: any) => {
          if (res && res.metadata) {
            // If its a container its more complicated as this is not an actual k8s resource
            if (node.data.Kind === 'Container') {}
            return res.metadata.name === name && res.kind === kind;
          } else {
            return false;
          }
        });

        if (node.data.kind === 'Container') {
          // Pull out the container from the Pod
          const pod = resource;
          resource = resource.spec.containers.find(c => c.name === node.label);

          // Fake some metadata that we want to use in the side-panel that is not present
          // because a container is not a first-class k8s resource
          const res = { ...resource };
          res._metadata = {
            kind: 'Container',
            apiVersion: '-',
            creationTimestamp: pod.metadata.creationTimestamp,
          };
          resource = res;
        }

        return resource;
      }),
      first(),
    );
  }

  public analysisChanged(report) {
    if (report === null) {
      // No report selected
      this.analysisReport = null;
      this.analysisReportUpdated.next('');
    } else {
        this.analyzerService.getByID(report.id).subscribe(results => {
        this.analysisReport = results;
        this.analysisReportUpdated.next(report.id);
      });
    }
  }

  public calculateAlertSummary(alerts) {
    let maxLevel = 0;

    alerts.forEach(alert => {
      if (alert.level > maxLevel) {
        maxLevel = alert.level;
      }
    });

    let color = '#c0c0c0';

    // Set the color
    switch (maxLevel as ResourceAlertLevel) {
      case ResourceAlertLevel.Info:
        color = '#06dbe2';
        break;
      case ResourceAlertLevel.Warning:
        color = '#ff9800';
        break;
      case ResourceAlertLevel.Error:
        color = 'red';
        break;
    }
    return {
      color,
    };
  }

}
