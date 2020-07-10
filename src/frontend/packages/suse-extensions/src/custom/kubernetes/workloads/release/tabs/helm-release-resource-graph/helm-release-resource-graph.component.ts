import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import { SidePanelService } from 'frontend/packages/core/src/shared/services/side-panel.service';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, first, map, startWith } from 'rxjs/operators';

import {
  KubernetesResourceViewerComponent,
} from '../../../../kubernetes-resource-viewer/kubernetes-resource-viewer.component';
import { ResourceAlert } from '../../../../services/analysis-report.types';
import { KubernetesAnalysisService } from '../../../../services/kubernetes.analysis.service';
import { KubeAPIResource } from '../../../../store/kube.types';
import { getIcon } from '../../icon-helper';
import { HelmReleaseHelperService } from '../helm-release-helper.service';


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

  private didInitialFit = false;

  public path: string;

  private analysisReportUpdated = new Subject<any>();
  private analysisReportUpdated$ = this.analysisReportUpdated.pipe(startWith(null), distinctUntilChanged());

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private helper: HelmReleaseHelperService,
    public analyzerService: KubernetesAnalysisService,
    private previewPanel: SidePanelService) {
    this.path = `${this.helper.namespace}/${this.helper.releaseTitle}`;
  }

  ngOnInit() {

    // Listen for the graph
    this.graph = combineLatest(
      this.helper.fetchReleaseGraph(),
      this.analysisReportUpdated$
    ).subscribe(([g, report]) => {
      const newNodes = [];
      Object.values(g.nodes).forEach((node: any) => {
        const colors = this.getColor(node.data.status);
        const icon = getIcon(node.data.kind);
        const missing = node.data.status === 'missing';

        const newNode = {
          id: node.id,
          label: node.label,
          data: {
            ...node.data,
            missing: node.data.status === 'missing',
            dash: missing ? 6 : 0,
            fill: colors.bg,
            text: colors.fg,
            icon: icon,
            alerts: null,
            alertSummary: {}
          },
        };

        // Does this node have any alerts?
        this.applyAlertToNote(newNode, report)

        newNodes.push(newNode);
      });
      this.nodes = newNodes;

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

      if (!this.didInitialFit) {
        this.didInitialFit = true;
        setTimeout(() => this.fitGraph(), 10);
      }
    });
  }

  private applyAlertToNote(newNode, report) {
    if (report && report.alerts) {
      console.log(newNode.data.metadata.namespace);
      Object.values(report.alerts).forEach((group: ResourceAlert[]) => {
        group.forEach(alert => {
          if (
            newNode.data.kind.toLowerCase() === alert.kind &&
            newNode.data.metadata.name === alert.name
            // && newNode.data.metadata.namespace === alert.namespace // TODO: RC CHECK! Is this needed given analysis should only contain
            // resources from this release?
          ) {
            console.log(newNode, alert);
            newNode.data.alerts = newNode.data.alerts || [];
            newNode.data.alerts.push(alert);
            newNode.data.alertSummary = newNode.data.alertSummary || {};
            if (newNode) {
              // TODO: RC retain the most critical colour, colourise appropriately
              newNode.data.alertSummary.color = 'red';
            }
          }
        });
      });
    }
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
        title: 'Helm Release Resource Preview',
        resource$: this.getResource(node)
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
      map((r: any[]) => Object.values(r).find((res: any) => res.metadata.name === node.label && res.metadata.kind === node.kind)),
      first(),
    );
  }

  public analysisChanged(report) {
    if (report === null) {
      this.analysisReportUpdated.next(null);
    } else {
      // TODO: RC Is this needed?
      this.analyzerService.getByID(this.helper.endpointGuid, report.id).subscribe(results => {
        this.analysisReportUpdated.next(results);
      });
    }
  }

}
