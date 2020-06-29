import { NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval } from 'rxjs';

import { AppState } from '../../../../../store/src/app-state';
import { analysisReportEntityType, kubernetesEntityFactory } from '../kubernetes-entity-factory';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { AnalysisReport } from '../store/kube.types';
import { GetAnalysisReports } from '../store/kubernetes.actions';
import { ListDataSource } from 'frontend/packages/core/src/shared/components/list/data-sources-controllers/list-data-source';
import { IListConfig } from 'frontend/packages/core/src/shared/components/list/list.component.types';
import { safeUnsubscribe } from 'frontend/packages/core/src/core/utils.service';

export class AnalysisReportsDataSource extends ListDataSource<AnalysisReport> {

  private polls;

  constructor(
    store: Store<AppState>,
    listConfig: IListConfig<AnalysisReport>,
    endpointService: KubernetesEndpointService,
    ngZone: NgZone,
  ) {
    const action = new GetAnalysisReports(endpointService.baseKube.guid);
    super({
      store,
      action,
      schema: kubernetesEntityFactory(analysisReportEntityType),
      getRowUniqueId: (entity: AnalysisReport) => entity.id,
      paginationKey: action.paginationKey,
      isLocal: true,
      listConfig,
    });

    this.polls = [];
    ngZone.runOutsideAngular(() => {
      this.polls.push(
        interval(5000).subscribe(() => {
          ngZone.run(() => {
            store.dispatch(action);
          });
        })
      );
    });
  }

  destroy() {
    safeUnsubscribe(...(this.polls || []));
  }
}
