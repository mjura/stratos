import { interval } from 'rxjs';
import { NgZone } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../../store/src/app-state';
import { ListDataSource } from '../../../shared/components/list/data-sources-controllers/list-data-source';
import { IListConfig } from '../../../shared/components/list/list.component.types';
import { AnalysisReport } from '../store/kube.types';
import { analysisReportEntityType, kubernetesEntityFactory } from '../kubernetes-entity-factory';
import { GetAnalysisReports } from '../store/kubernetes.actions';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { safeUnsubscribe } from '../../../core/utils.service';

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
      //transformEntities: [{ type: 'filter', field: 'name' },
      // (entities: AnalysisReport[], paginationState: PaginationEntityState) => {
      //   const repository = paginationState.clientPagination.filter.items.repository;
      //   return entities.filter(e => {
      //     return !(repository && repository !== e.attributes.repo.name);
      //   });
      // ]
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
