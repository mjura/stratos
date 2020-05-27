import { Component } from '@angular/core';

import { TableCellCustom } from '../../../../../shared/components/list/list.types';
import { KubeConfigFileCluster } from '../../kube-config.types';

@Component({
  selector: 'app-kube-config-table-select',
  templateUrl: './kube-config-table-select.component.html',
  styleUrls: ['./kube-config-table-select.component.scss']
})
export class KubeConfigTableSelectComponent extends TableCellCustom<KubeConfigFileCluster> {

  changed(v) {
    this.row._selected = v.checked;
    if (this.row._onUpdate) {
      this.row._onUpdate(this.row);
    }
  }

}
