import { Component, OnInit } from '@angular/core';

import { TableCellCustom } from '../../../../../../../core/src/shared/components/list/list.types';
import { KubeConfigAuthHelper } from '../../kube-config-auth.helper';
import { KubeConfigFileCluster } from '../../kube-config.types';

@Component({
  selector: 'app-kube-config-table-sub-type-select',
  templateUrl: './kube-config-table-sub-type-select.component.html',
  styleUrls: ['./kube-config-table-sub-type-select.component.scss']
})
export class KubeConfigTableSubTypeSelectComponent extends TableCellCustom<KubeConfigFileCluster> implements OnInit {

  selected: any;

  subTypes;

  constructor() {
    super();

    const helper = new KubeConfigAuthHelper();
    this.subTypes = helper.subTypes;
  }

  ngOnInit() {
    this.selected = this.row._subType || '';
  }

  valueChanged(value) {
    this.row._subType = value;
    if (this.row._onUpdate) {
      this.row._onUpdate(this.row);
    }
  }
}
