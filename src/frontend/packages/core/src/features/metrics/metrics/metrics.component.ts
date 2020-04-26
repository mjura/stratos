import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

import {
  MetricsAPIAction,
  MetricsAPITargets,
  MetricsStratosAction,
} from '../../../../../store/src/actions/metrics-api.actions';
import { AppState } from '../../../../../store/src/app-state';
import { entityCatalog } from '../../../../../store/src/entity-catalog/entity-catalog.service';
import { getIdFromRoute } from '../../../core/utils.service';
import { IHeaderBreadcrumb } from '../../../shared/components/page-header/page-header.types';
import { StratosStatus } from '../../../shared/shared.types';
import { EndpointIcon, getFullEndpointApiUrl } from '../../endpoints/endpoint-helpers';
import { MetricsEndpointProvider, MetricsService } from '../services/metrics-service';

interface EndpointMetadata {
  type: string;
  icon: EndpointIcon;
}
interface MetricsInfo {
  entity: MetricsEndpointProvider;
  metadata: {
    [guid: string]: EndpointMetadata;
  };
}

interface PrometheusJobDetail {
  name: string;
  health: string;
  lastError: string;
  lastScrape: string;
}

interface PrometheusJobs {
  [guid: string]: PrometheusJobDetail;
}

// Info for an endpoint that a metrics endpoint provides for
interface MetricsEndpointInfo {
  name: string;
  icon: EndpointIcon;
  type: string;
  known: boolean;
  url: string;
  metadata: {
    metrics_job?: string;
    metrics_environment?: string;
  };
  status: Observable<StratosStatus>;
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent {
  public metricsEndpoint$: Observable<MetricsEndpointProvider>;
  public metricsInfo$: Observable<MetricsEndpointInfo[]>;
  public breadcrumbs$: Observable<IHeaderBreadcrumb[]>;
  public jobDetails$: Observable<PrometheusJobs>;

  // Was there an error retrieving data from the Prometheus server?
  public error = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private metricsService: MetricsService,
    private store: Store<AppState>,

  ) {

    const metricsGuid = getIdFromRoute(this.activatedRoute, 'metricsId');
    this.store.dispatch(new MetricsAPIAction(metricsGuid, 'targets'));
    this.store.dispatch(new MetricsStratosAction(metricsGuid));

    // Raw endpoint data for this metrics endpoint
    this.metricsEndpoint$ = this.metricsService.metricsEndpoints$.pipe(
      map((ep) => ep.find((item) => item.provider.guid === metricsGuid)),
    );

    // Processed endpoint data
    this.metricsInfo$ = this.metricsEndpoint$.pipe(map((ep) => this.mapData(ep)));

    // Breadcrumbs
    this.breadcrumbs$ = this.metricsEndpoint$.pipe(
      map(() => ([ { breadcrumbs: [ { value: 'Endpoints', routerLink: `/endpoints` } ] } ])),
      first()
    );

    // Job details obtained from the Prometheus server
    this.jobDetails$ = this.metricsEndpoint$.pipe(
      filter(mi => !!mi && !!mi.provider && !!mi.provider.metadata && !!mi.provider.metadata.metrics_targets),
      map(mi => mi.provider.metadata.metrics_targets),
      map((targetsData: MetricsAPITargets) => targetsData.activeTargets.reduce((mapped, t) => {
        if (t.labels && t.labels.job) {
          mapped[t.labels.job] = t;
        }
        return mapped;
      }, {}))
    );
  }

  // Process the endpoint and Stratos marker file data to give a single list of endpoitns
  // linked to this metrics endpoint, comprising those that are known in Stratos and those that are not
  private mapData(ep: MetricsEndpointProvider): MetricsEndpointInfo[] {
    const data: MetricsEndpointInfo[] = [];

    // Add all of the known endpoints first
    ep.endpoints.forEach(endpoint => {
      const catalogEndpoint = entityCatalog.getEndpoint(endpoint.cnsi_type, endpoint.sub_type);

      data.push({
        known: true,
        name: endpoint.name,
        url: getFullEndpointApiUrl(endpoint),
        type: catalogEndpoint.definition.label,
        icon: {
          name: catalogEndpoint.definition.icon,
          font: 'stratos-icons'
        },
        metadata: {
          metrics_job: endpoint.metadata ? endpoint.metadata.metrics_job : null,
          metrics_environment: endpoint.metadata ? endpoint.metadata.metrics_environment : null
        },
        status: observableOf(StratosStatus.OK)
      });
    });

    // Add all of the potentially unknown endpoints
    if (ep.provider && ep.provider.metadata && ep.provider.metadata && ep.provider.metadata.metrics_stratos) {
      if ((ep.provider.metadata.metrics_stratos as any).error) {
        this.error = true;
      } else if (Array.isArray(ep.provider.metadata.metrics_stratos)) {
        ep.provider.metadata.metrics_stratos.forEach(endp => {
          // See if we already know about this endpoint
          const hasEndpoint = data.findIndex(i => i.url === endp.url) !== -1;
          if (!hasEndpoint) {
            const catalogEndpoint = entityCatalog.getEndpoint(endp.type, '');
            data.push({
              known: false,
              name: '<Unregistered Endpoint>',
              url: endp.url,
              type: catalogEndpoint.definition.label,
              icon: {
                name: catalogEndpoint.definition.icon,
                font: 'stratos-icons'
              },
              metadata: {
                metrics_job: endp.job
              },
              status: observableOf(StratosStatus.WARNING)
            });
          }
        });
      }
    }

    return data;
  }
}
