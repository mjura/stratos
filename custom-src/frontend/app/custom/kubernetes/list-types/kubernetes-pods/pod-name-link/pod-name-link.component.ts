import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { PanelPreviewService } from '../../../../../../../core/src/shared/services/panel-preview.service';
import { EndpointsService } from '../../../../../core/endpoints.service';
import { getIdFromRoute } from '../../../../../core/utils.service';
import { TableCellCustom } from '../../../../../shared/components/list/list.types';
import { KubernetesPodPreviewComponent } from '../../../kubernetes-pod-preview/kubernetes-pod-preview.component';
import { KubernetesEndpointService } from '../../../services/kubernetes-endpoint.service';
import { KubernetesPod } from '../../../store/kube.types';

@Component({
  selector: 'app-pod-name-link',
  templateUrl: './pod-name-link.component.html',
  styleUrls: ['./pod-name-link.component.scss']
})
export class PodNameLinkComponent extends TableCellCustom<KubernetesPod> implements OnInit {
  routerLink: string[];
  hasMetrics$: Observable<boolean>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private endpointsService: EndpointsService,
    private kubeEndpointService: KubernetesEndpointService,
    private panelPreviewService: PanelPreviewService,
  ) {
    super();
  }

  ngOnInit() {
    this.hasMetrics$ = this.endpointsService.hasMetrics(this.kubeEndpointService.kubeGuid).pipe(
      first()
    );
    const namespace = getIdFromRoute(this.activatedRoute, 'namespaceName');
    if (!namespace) {
      this.routerLink = [this.row.metadata.namespace, this.row.metadata.name];
    } else {
      this.routerLink = [this.row.metadata.name];
    }
  }

  openSidepanelPreview($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.panelPreviewService.show(KubernetesPodPreviewComponent, {
      podGuid: this.row.metadata.uid,
      podName: this.row.metadata.name,
      namespaceName: this.row.metadata.namespace,
      kubeGuid: this.kubeEndpointService.kubeGuid,
    });
  }
}
