import { NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { safeUnsubscribe } from 'frontend/packages/core/src/core/utils.service';
import { ListDataSource } from 'frontend/packages/core/src/shared/components/list/data-sources-controllers/list-data-source';
import { IListConfig } from 'frontend/packages/core/src/shared/components/list/list.component.types';
import { interval } from 'rxjs';

import { AppState } from '../../../../../store/src/app-state';
import { kubeEntityCatalog } from '../kubernetes-entity-catalog';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { AnalysisReport } from '../store/kube.types';

export class AnalysisReportsDataSource extends ListDataSource<AnalysisReport> {

  private polls;

  constructor(
    store: Store<AppState>,
    listConfig: IListConfig<AnalysisReport>,
    endpointService: KubernetesEndpointService,
    ngZone: NgZone,
  ) {
    const action = kubeEntityCatalog.analysisReport.actions.getMultiple(endpointService.baseKube.guid);
    super({
      store,
      action,
      schema: action.entity[0],
      getRowUniqueId: (entity: AnalysisReport) => action.entity[0].getId(entity),
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
