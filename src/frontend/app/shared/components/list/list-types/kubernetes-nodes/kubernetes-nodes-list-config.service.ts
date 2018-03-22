import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApplicationService } from '../../../../../features/applications/application.service';
import { AppVariablesDelete } from '../../../../../store/actions/app-variables.actions';
import { AppState } from '../../../../../store/app-state';
import { ITableColumn } from '../../list-table/table.types';
import { IListAction, IListConfig, IMultiListAction, ListViewTypes } from '../../list.component.types';
import { TableCellEditComponent } from '../../list-table/table-cell-edit/table-cell-edit.component';
import { ActivatedRoute } from '@angular/router';
import { KubernetesNodeInfo, KubernetesNodesDataSource } from './kubernetes-nodes-data-source';
import { BaseKubeGuid } from '../../../../../features/kubernetes/kubernetes-page.types';
import { KubernetesNodeCapacityComponent } from './kubernetes-node-capacity/kubernetes-node-capacity.component';
import { KubernetesNodeStatusComponent } from './kubernetes-node-status/kubernetes-node-status.component';

@Injectable()
export class KubernetesNodesListConfigService implements IListConfig<KubernetesNodeInfo> {
  nodesDataSource: KubernetesNodesDataSource;

  columns: Array<ITableColumn<KubernetesNodeInfo>> = [
    {
      columnId: 'status', headerCell: () => 'Status',
      cellComponent: KubernetesNodeStatusComponent,
      cellFlex: '0 0 64px',
    },
    {
      columnId: 'name', headerCell: () => 'ID',
      cellDefinition: {
        getValue: (row) => `${row.metadata.name}`
      },
      sort: {
        type: 'sort',
        orderKey: 'name',
        field: 'metadata.name'
      },
      cellFlex: '5',
    },
    {
      columnId: 'capacity', headerCell: () => 'Capacity',
      cellComponent: KubernetesNodeCapacityComponent,
      cellFlex: '5',
    },
    {
      columnId: 'internal_ip', headerCell: () => 'Internal IP',
      cellDefinition: {
        getValue: (row) => {
          const ips = row.status.addresses.filter(item => item.type === 'InternalIP');
          return ips.length === 1 ? ips[0].address : '-';
        }
      },
      cellFlex: '2',
    },
  ];  

  pageSizeOptions = [9, 45, 90];
  viewType = ListViewTypes.TABLE_ONLY;
  text = {
    title: 'Nodes'
  };
  enableTextFilter = false;

  getGlobalActions = () => null;
  getMultiActions = () => [];
  getSingleActions = () => [];
  getColumns = () => this.columns;
  getDataSource = () => this.nodesDataSource;
  getMultiFiltersConfigs = () => [];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private kubeId: BaseKubeGuid,
  ) {
    this.nodesDataSource = new KubernetesNodesDataSource(this.store, kubeId, this);
  }

}
