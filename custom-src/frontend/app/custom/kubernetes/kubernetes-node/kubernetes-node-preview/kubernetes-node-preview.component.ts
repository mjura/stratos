import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { PreviewableComponent } from '../../../../../../core/src/shared/previewable-component';
import { KubernetesEndpointService } from '../../services/kubernetes-endpoint.service';
import { KubernetesNodeService } from '../../services/kubernetes-node.service';

@Component({
  selector: 'app-kubernetes-node-preview-component',
  templateUrl: './kubernetes-node-preview.component.html',
  styleUrls: ['./kubernetes-node-preview.component.scss']
})
export class KubernetesNodePreviewComponent implements PreviewableComponent {

  title: string = null;
  detailsLoading$: Observable<boolean>;
  kubeVersion$: Observable<string>;
  podCount$: Observable<number>;
  memoryCapacity$: Observable<string | number>;
  podsLink: string;

  constructor(
    public kubeEndpointService: KubernetesEndpointService,
    public kubeNodeService: KubernetesNodeService,
  ) {
  }

  setProps(props: { [key: string]: any }) {
    const nodeName = props.nodeName;
    const kubeGuid = props.kubeGuid;

    this.title = nodeName;

    this.kubeEndpointService.initialize(kubeGuid);
    this.kubeNodeService.initialize(nodeName, kubeGuid);

    this.podCount$ = this.kubeEndpointService.pods$.pipe(
      map(pods => pods.filter(p => p.spec.nodeName === nodeName).length)
    );

    this.memoryCapacity$ = this.kubeNodeService.nodeEntity$.pipe(
      map(node => this.getMemory(node.status.capacity.memory))
    );

    this.podsLink = `/kubernetes/${kubeGuid}/nodes/minikube/pods`;

    this.detailsLoading$ = this.kubeNodeService.nodeEntity$.pipe(
      map((entity) => !entity),
      startWith(true),
    );
  }

  private getMemory(memoryCapacity: string) {
    if (memoryCapacity.endsWith('Ki')) {
      const value = parseInt(memoryCapacity, 10);
      return (value * 1024);
    }
    return memoryCapacity;
  }
}
