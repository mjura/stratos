import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, map, shareReplay, tap } from 'rxjs/operators';

import { EntityServiceFactory } from '../../../../../core/src/core/entity-service-factory.service';
import { PreviewableComponent } from '../../../../../core/src/shared/previewable-component';
import { EntityInfo } from '../../../../../store/src/types/api.types';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { KubernetesNodeService } from '../services/kubernetes-node.service';
import { KubernetesPod } from '../store/kube.types';
import { GetKubernetesPod } from '../store/kubernetes.actions';

@Component({
  selector: 'app-kubernetes-pod-preview-component',
  templateUrl: './kubernetes-pod-preview.component.html',
  styleUrls: ['./kubernetes-pod-preview.component.scss']
})
export class KubernetesPodPreviewComponent implements PreviewableComponent {

  title: string = null;
  detailsLoading$: Observable<boolean>;
  pod$: Observable<EntityInfo<KubernetesPod>>;
  podEntity$: Observable<KubernetesPod>;

  constructor(
    public kubeEndpointService: KubernetesEndpointService,
    public kubeNodeService: KubernetesNodeService,
    private entityServiceFactory: EntityServiceFactory,
  ) {
  }

  setProps(props: { [key: string]: any }) {
    const { podName, namespaceName, kubeGuid, podGuid } = props;

    this.title = podName;

    const podEntityService = this.entityServiceFactory.create<KubernetesPod>(
      podGuid,
      new GetKubernetesPod(podName, namespaceName, kubeGuid),
    );

    this.pod$ = podEntityService.entityObs$.pipe(
      tap(p => console.log(1, p)),
      filter(p => !!p && !!p.entity),
      first(),
      shareReplay(1),
    );

    this.podEntity$ = this.pod$.pipe(
      tap(p => console.log(2, p)),
      map(p => p.entity)
    );

    // this.detailsLoading$ = this.kubeNodeService.nodeEntity$.pipe(
    //   map((entity) => !entity),
    //   startWith(false),
    // );
  }
}
