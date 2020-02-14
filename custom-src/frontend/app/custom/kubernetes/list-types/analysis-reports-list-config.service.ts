import { AnalysisReportsDataSource } from './analysis-reports-list-source';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { of } from 'rxjs';

import { ListView } from '../../../../../store/src/actions/list.actions';
import { AppState } from '../../../../../store/src/app-state';
import { ITableColumn } from '../../../shared/components/list/list-table/table.types';
import { IListConfig, IListMultiFilterConfig, ListViewTypes, IListAction } from '../../../shared/components/list/list.component.types';
import { defaultHelmKubeListPageSize } from '../../kubernetes/list-types/kube-helm-list-types';
import { AnalysisReport } from '../store/kube.types';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { KubernetesAnalysisService } from '../services/kubernetes.analysis.service';
import { AnalysisStatusCellComponent } from './analysis-status-cell/analysis-status-cell.component';

@Injectable()
export class AnalysisReportsListConfig implements IListConfig<AnalysisReport> {
  AppsDataSource: AnalysisReportsDataSource;
  isLocal = true;
  multiFilterConfigs: IListMultiFilterConfig[];

  guid: string;

  columns: Array<ITableColumn<AnalysisReport>> = [
    {
      columnId: 'name', headerCell: () => 'Name',
      cellDefinition: {
        getValue: (row: AnalysisReport) => row.name,
        getLink: row => `/kubernetes/${this.guid}/analysis/report/${row.id}`
      },
      sort: {
        type: 'sort',
        orderKey: 'name',
        field: 'name'
      },
      cellFlex: '2',
    },
    {
      columnId: 'type',
      headerCell: () => 'Type',
      cellDefinition: {
        getValue: (row: AnalysisReport) => row.type.charAt(0).toUpperCase() + row.type.substring(1)
      },
      sort: {
        type: 'sort',
        orderKey: 'type',
        field: 'type'
      },
      cellFlex: '1'
    },
    {
      columnId: 'age',
      headerCell: () => 'Age',
      cellDefinition: {
        getValue: (row: AnalysisReport) => {
          return moment(row.created).fromNow(true);
        }
      },
      sort: {
        type: 'sort',
        orderKey: 'age',
        field: 'created'
      },
      cellFlex: '1'
    },
    {
      columnId: 'status',
      headerCell: () => 'Status',
      cellComponent: AnalysisStatusCellComponent,
      // cellDefinition: {
      //   getValue: (row: AnalysisReport) => row.status
      // },
      sort: {
        type: 'sort',
        orderKey: 'status',
        field: 'status'
      },
      cellFlex: '1'
    }

    // {
    //   columnId: 'description', headerCell: () => 'Description',
    //   cellDefinition: {
    //     getValue: (row) => row.attributes.description,
    //   },
    //   sort: {
    //     type: 'sort',
    //     orderKey: 'description',
    //     field: 'attributes.description'
    //   },
    //   cellFlex: '5',
    // },
    // {
    //   columnId: 'repository', headerCell: () => 'Repository',
    //   cellDefinition: {
    //     getValue: (row) => row.attributes.repo.name
    //   },
    //   sort: {
    //     type: 'sort',
    //     orderKey: 'repository',
    //     field: 'attributes.repo.name'
    //   },
    //   cellFlex: '2',
    // },
  ];

  pageSizeOptions = defaultHelmKubeListPageSize;
  viewType = ListViewTypes.TABLE_ONLY;
  defaultView = 'table' as ListView;

  enableTextFilter = true;
  text = {
    filter: 'Filter by Name',
    noEntries: 'There are no Analysis Reports'
  };

  constructor(
    store: Store<AppState>,
    kubeEndpointService: KubernetesEndpointService,
    private route: ActivatedRoute,
    private analysisService: KubernetesAnalysisService,
    ngZone: NgZone,
  ) {
    this.guid = kubeEndpointService.baseKube.guid;
    this.AppsDataSource = new AnalysisReportsDataSource(store, this, kubeEndpointService, ngZone);
  }

  private listActionDelete: IListAction<any> = {
    action: (item) => {
      console.log(item);
      return this.analysisService.delete(item);

    },
    label: 'Delete',
    icon: 'delete',
    description: ``, // Description depends on console user permission
    createEnabled: row$ => of(true)
  };

  private singleActions = [
    this.listActionDelete,
  ];

  getGlobalActions = () => [];
  getMultiActions = () => [];
  getSingleActions = () => this.singleActions;
  getColumns = () => this.columns;
  getDataSource = () => this.AppsDataSource;
  getMultiFiltersConfigs = () => [];
  //[this.createRepositoryFilterConfig()];

  // private createRepositoryFilterConfig(): IListMultiFilterConfig {
  //   return {
  //     key: 'repository',
  //     label: 'Repository',
  //     allLabel: 'All Repositories',
  //     list$: this.helmRepositories(),
  //     loading$: observableOf(false),
  //     select: new BehaviorSubject(this.route.snapshot.params.repo)
  //   };
  // }

  // private helmRepositories(): Observable<any> {
  //   return this.endpointsService.endpoints$.pipe(
  //     map(endpoints => {
  //       const repos = [];
  //       Object.values(endpoints).forEach(ep => {
  //         if (ep.cnsi_type === 'helm') {
  //           repos.push({ label: ep.name, item: ep.name, value: ep.name });
  //         }
  //       });
  //       return repos;
  //     })
  //   );
  // }
}
