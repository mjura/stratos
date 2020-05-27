import { Component, OnInit } from '@angular/core';

import { TableCellCustom } from '../../../../../shared/components/list/list.types';
import { KubeConfigFileCluster } from '../../kube-config.types';

@Component({
  selector: 'app-kube-config-table-user-select',
  templateUrl: './kube-config-table-user-select.component.html',
  styleUrls: ['./kube-config-table-user-select.component.scss']
})
export class KubeConfigTableUserSelectComponent extends TableCellCustom<KubeConfigFileCluster> implements OnInit {

  multipleUsers = false;
  selected: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.selected = this.row._user;
    this.multipleUsers = this.row._users.length > 1;
  }

  valueChanged(value) {
    this.row._user = value;
    if (this.row._onUpdate) {
      this.row._onUpdate(this.row);
    }
  }

}
