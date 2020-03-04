import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { BooleanIndicatorType } from '../../../../../shared/components/boolean-indicator/boolean-indicator.component';
import { ITableListDataSource } from '../../../../../shared/components/list/data-sources-controllers/list-data-source-types';
import {
  TableCellBooleanIndicatorComponent,
  TableCellBooleanIndicatorComponentConfig,
} from '../../../../../shared/components/list/list-table/table-cell-boolean-indicator/table-cell-boolean-indicator.component';
import {
  TableCellIconComponent,
  TableCellIconComponentConfig,
} from '../../../../../shared/components/list/list-table/table-cell-icon/table-cell-icon.component';
import { ITableColumn } from '../../../../../shared/components/list/list-table/table.types';
import { CardCell } from '../../../../../shared/components/list/list.types';
import { Container, ContainerState, ContainerStatus, InitContainer, KubernetesPod } from '../../../store/kube.types';

export interface ContainerForTable {
  isInit: boolean;
  container: Container | InitContainer;
  containerStatus: ContainerStatus;
}

@Component({
  selector: 'app-kubernetes-pod-containers',
  templateUrl: './kubernetes-pod-containers.component.html',
  styleUrls: ['./kubernetes-pod-containers.component.scss'],
  providers: [
    TitleCasePipe
  ]
})
export class KubernetesPodContainersComponent extends CardCell<KubernetesPod> {


  @Input()
  set row(row: KubernetesPod) {
    if (!row) {
      return;
    }
    const containerStatus = row.status.containerStatuses || [];
    const initContainerStatuses = row.status.initContainerStatuses || [];
    const containerStatusWithContainers: ContainerForTable[] = [
      ...containerStatus.map(c => this.createContainerForTable(c, row.spec.containers)),
      ...initContainerStatuses.map(c => this.createContainerForTable(c, row.spec.initContainers, true))
    ];

    console.log(row, containerStatusWithContainers); // TODO: RC


    this.containerSubject.next(containerStatusWithContainers);

    this.containerDataSource = {
      isTableLoading$: of(false),
      connect: () => this.containers$,
      disconnect: () => { },
      trackBy: (index, container: ContainerForTable) => container.container.name
    };
  }

  private readyBoolConfig: TableCellBooleanIndicatorComponentConfig<ContainerForTable> = {
    isEnabled: (row: ContainerForTable) => row.containerStatus.ready,
    type: BooleanIndicatorType.yesNo,
    subtle: false,
    showText: false
  };

  private initBoolConfig: TableCellBooleanIndicatorComponentConfig<ContainerForTable> = {
    isEnabled: (row: ContainerForTable) => row.isInit,
    type: BooleanIndicatorType.yesNo,
    subtle: true,
    showText: false
  };

  private iconConfig: TableCellIconComponentConfig<ContainerForTable> = {
    getIcon: (row: ContainerForTable) => {
      if (row.isInit) {
        return {
          icon: 'screen_rotation', // TODO: RC icon
          font: '',
          tooltip: 'Init Container'
        };
      }
      return {
        icon: 'sd_storage',
        font: '',
        tooltip: 'Container' // TODO: RC icon
      };
    },
    // size: '18px'
  };

  public containerDataSource: ITableListDataSource<ContainerForTable>;
  public columns: ITableColumn<ContainerForTable>[] = [
    {
      columnId: 'icon',
      headerCell: () => '',
      cellComponent: TableCellIconComponent,
      cellConfig: this.iconConfig,
      cellFlex: '0 0 64px',
    },
    {
      columnId: 'name',
      headerCell: () => 'Container Name',
      cellDefinition: {
        valuePath: 'container.name'
      },
      cellFlex: '2',
    },
    {
      columnId: 'image',
      headerCell: () => 'Image',
      cellDefinition: {
        valuePath: 'container.image'
      },
      cellFlex: '3',
    },
    {
      columnId: 'ready',
      headerCell: () => 'Ready',
      cellComponent: TableCellBooleanIndicatorComponent,
      cellConfig: this.readyBoolConfig,
      cellFlex: '1',
    },
    {
      columnId: 'status',
      headerCell: () => 'State',
      cellDefinition: {
        getValue: cft => {
          if (!cft.containerStatus.state) {
            return 'Unknown';
          }
          const entries = Object.entries(cft.containerStatus.state);
          if (!entries.length) {
            return 'Unknown';
          }
          const sorted = entries.sort((a, b) => {
            const aStarted = moment(a[1].startedAt);
            const bStarted = moment(b[1].startedAt);

            return aStarted.isBefore(bStarted) ? -1 :
              aStarted.isAfter(bStarted) ? 1 : 0;

          });
          return this.containerStatusToString(sorted[0][0], sorted[0][1]);
        }
      },
      cellFlex: '1'
    },
    {
      columnId: 'init',
      headerCell: () => 'Is Init',
      cellComponent: TableCellBooleanIndicatorComponent,
      cellConfig: this.initBoolConfig,
      cellFlex: '1',
      sort: {
        type: 'sort',
        orderKey: 'init',
        field: 'init'
      }
    },
    {
      columnId: 'restarts',
      headerCell: () => 'Restarts',
      cellDefinition: {
        getValue: cft => cft.containerStatus.restartCount.toString()
      },
      cellFlex: '1',
    },
    {
      columnId: 'probes',
      headerCell: () => 'Probes (L:R)',
      cellDefinition: {
        getValue: cft => {
          if (cft.isInit) {
            return '';
          }
          const container: Container = cft.container as Container;
          return cft.isInit ? '' : `${container.livenessProbe ? 'on' : 'off'}:${container.readinessProbe ? 'on' : 'off'}`;
        }
      },
      cellFlex: '1',
    },
  ];

  private containerSubject = new BehaviorSubject([]);
  private containers$: Observable<ContainerForTable[]> = this.containerSubject.asObservable();

  constructor(private titleCase: TitleCasePipe) {
    super();
  }

  private createContainerForTable(containerStatus: ContainerStatus, containers: (Container | InitContainer)[], isInit = false):
    ContainerForTable {
    const containerForTable: ContainerForTable = {
      isInit,
      containerStatus,
      container: containers.find(c => c.name === containerStatus.name)
    };
    return containerForTable;
  }

  private containerStatusToString(state: string, status: ContainerState): string {
    const exitCode = status.exitCode ? `:${status.exitCode}` : '';
    const signal = status.signal ? `:${status.signal}` : '';
    const reason = status.reason ? ` (${status.reason}${exitCode || signal})` : '';
    return `${this.titleCase.transform(state)}${reason}`;
  }
}
