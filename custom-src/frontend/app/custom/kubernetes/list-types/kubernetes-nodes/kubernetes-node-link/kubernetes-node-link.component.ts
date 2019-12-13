import { Component, OnInit } from '@angular/core';

import { PanelPreviewService } from '../../../../../../../core/src/shared/services/panel-preview.service';
import { TableCellCustom } from '../../../../../shared/components/list/list.types';
import {
  KubernetesNodePreviewComponent,
} from '../../../kubernetes-node/kubernetes-node-preview/kubernetes-node-preview.component';
import { KubernetesEndpointService } from '../../../services/kubernetes-endpoint.service';
import { KubernetesNode } from '../../../store/kube.types';

@Component({
  selector: 'app-kubernetes-node-link',
  templateUrl: './kubernetes-node-link.component.html',
  styleUrls: ['./kubernetes-node-link.component.scss']
})
export class KubernetesNodeLinkComponent extends TableCellCustom<KubernetesNode> implements OnInit {

  public nodeLink;
  constructor(
    private kubeEndpointService: KubernetesEndpointService,
    private panelPreviewService: PanelPreviewService,
  ) {
    super();
  }

  ngOnInit() {
    this.nodeLink = `/kubernetes/${this.kubeEndpointService.kubeGuid}/nodes/${this.row.metadata.name}`;
  }

  openSidepanelPreview($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.panelPreviewService.show(KubernetesNodePreviewComponent, {
      nodeName: this.row.metadata.name,
      kubeGuid: this.kubeEndpointService.kubeGuid,
    });
  }

}
