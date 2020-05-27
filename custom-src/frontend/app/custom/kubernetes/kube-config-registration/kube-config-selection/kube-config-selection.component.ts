import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as yaml from 'js-yaml';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { first } from 'rxjs/operators';

import {
  TableHeaderSelectComponent,
} from '../../../../shared/components/list/list-table/table-header-select/table-header-select.component';
import { KubeConfigHelper } from '../kube-config.helper';
import { KubeConfigFileCluster } from '../kube-config.types';
import { EndpointOnlyAppState } from './../../../../../../store/src/app-state';
import { EndpointsService } from './../../../../core/endpoints.service';
import { RowState } from './../../../../shared/components/list/data-sources-controllers/list-data-source-types';
import { ITableColumn } from './../../../../shared/components/list/list-table/table.types';
import { KubeConfigTableSelectComponent } from './kube-config-table-select/kube-config-table-select.component';
import {
  KubeConfigTableSubTypeSelectComponent,
} from './kube-config-table-sub-type-select/kube-config-table-sub-type-select.component';
import { KubeConfigTableUserSelectComponent } from './kube-config-table-user-select/kube-config-table-user-select.component';

@Component({
  selector: 'app-kube-config-selection',
  templateUrl: './kube-config-selection.component.html',
  styleUrls: ['./kube-config-selection.component.scss']
})
export class KubeConfigSelectionComponent implements OnInit {

  // Has the user selected a config?
  hasConfig = false;

  public dataSource: any;
  // public dataSource: ITableListDataSource<KubeConfigFileCluster>;

  public columns: ITableColumn<KubeConfigFileCluster>[] = [];

  importData: KubeConfigFileCluster[];

  data = new BehaviorSubject<KubeConfigFileCluster[]>([]);
  data$: Observable<KubeConfigFileCluster[]>;

  // Is the import data valid?
  valid = new BehaviorSubject<boolean>(false);
  valid$: Observable<boolean>;

  helper: KubeConfigHelper;

  canSetIntermediate = false;

  endpoints = {};

  constructor(
    private store: Store<EndpointOnlyAppState>,
    public endpointsService: EndpointsService,
    private http: HttpClient
  ) {
    this.valid$ = this.valid.asObservable();
    this.data$ = this.data.asObservable();
  }

  ngOnInit() {

    const tableColumnSelect: ITableColumn<any> = {
      columnId: 'select',
      headerCellComponent: TableHeaderSelectComponent,
      cellComponent: KubeConfigTableSelectComponent,
      class: 'table-column-select',
      cellFlex: '0 0 48px'
    };

    // Load data from a test file
    const test = '/core/assets/kubeconfig.yaml';

    this.endpointsService.endpoints$.pipe(
      first()
    ).subscribe(eps => {
      this.endpoints = eps;

      this.helper = new KubeConfigHelper(Object.values(eps));

      this.http.get(test, {responseType: 'text'}).subscribe(d => {
        const items = this.helper.parse(d, (row) => this.rowChanged(row));
        this.importData = items;
        this.hasConfig = true;

        // Add the _subtype

        console.log(this.importData);
        this.data.next(items);
        this.checkCanGoNext();
      });
    });

    this.dataSource = {
      connect: () => this.data$,
      disconnect: () => { },
      trackBy: (index, row) => row.name,
      isTableLoading$: observableOf(false),
      getRowState: (row: KubeConfigFileCluster, schemaKey: string): Observable<RowState> => {
        return row ? row._state.asObservable() : observableOf({});
      },
      selectAllIndeterminate: false,
      selectAllChecked: false,
      selectAllFilteredRows: (r) => {
        this.dataSource.selectAllChecked = !this.dataSource.selectAllChecked;
        this.canSetIntermediate = this.dataSource.selectAllChecked;

        this.importData.forEach(d => {
          if ( !d._invalid) {
            d._selected = this.dataSource.selectAllChecked;
            this.helper.checkValidity(d);
          }
        });
        this.checkCanGoNext();
      }
    };
    // as ITableListDataSource<KubeConfigFileCluster>;

    // Table columns
    this.columns = [
      tableColumnSelect,
      {
        columnId: 'name', headerCell: () => 'Name',
        cellDefinition: {
          valuePath: 'name'
        },
        cellFlex: '2',
      },
      {
        columnId: 'url', headerCell: () => 'URL',
        cellDefinition: {
          valuePath: 'cluster.server'
        },
        cellFlex: '4',
      },
      {
        columnId: 'type', headerCell: () => 'Type',
        cellFlex: '1',
        cellComponent: KubeConfigTableSubTypeSelectComponent
      },
      {
        columnId: 'user', headerCell: () => 'User',
        cellFlex: '4',
        cellComponent: KubeConfigTableUserSelectComponent
      }
    ];
  }

  // Save data for the next step to know the list of clusters to import
  onNext = () => {
    return observableOf({
      success: true,
      data: this.importData
    });
  }

  // User selected a config file
  public kubeConfigSelected(event) {
    // TODO: Wrap this in exception handler

    const doc = yaml.safeLoad(event);
    this.hasConfig = true;

    // Doc will be jsobject for a kube config file
  }

  // Row changed event - update the validity of the data based on the changes
  rowChanged(row: KubeConfigFileCluster) {
    this.helper.checkValidity(row);

    this.checkCanGoNext();

    // Check the select all state
    let selectedCount = 0;
    let totalCount = 0;
    this.importData.forEach(i => {
      if (!i._invalid) {
        totalCount++;
        selectedCount += i._selected ? 1 : 0;
      }
    });

    if (selectedCount === 0 || totalCount === selectedCount) {
        this.dataSource.selectAllIndeterminate = false;
        this.dataSource.selectAllChecked = (selectedCount !== 0);
    } else {
      if (this.canSetIntermediate) {
        this.dataSource.selectAllIndeterminate = true;
      }
    }

    if (selectedCount === 0) {
      this.canSetIntermediate = false;
    }

    // console.log('row select changed');
    // console.log(this.dataSource.selectAllIndeterminate + ', ' +  this.dataSource.selectAllChecked);
    // console.log(totalCount + ', ' + selectedCount);
    // this.dataSource.selectAllIndeterminate = (totalCount > 0 && selectedCount !== totalCount);
    // console.log(this.dataSource.selectAllIndeterminate + ', ' +  this.dataSource.selectAllChecked);
  }

  // Can we proceed?
  checkCanGoNext() {
    let selected = 0;
    let okay = 0;
    this.importData.forEach(i => {
      if (i._selected) {
        selected++;
        if (i._user && !i._invalid) {
          okay++;
        }
      }
    });

    // Must be at least one selected and they all must be okay to import
    this.valid.next(selected > 0 && selected === okay);
  }

}
