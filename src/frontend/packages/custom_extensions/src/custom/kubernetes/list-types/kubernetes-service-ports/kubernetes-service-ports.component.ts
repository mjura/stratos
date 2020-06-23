import { Component, Input } from '@angular/core';

import { CardCell } from '../../../../shared/components/list/list.types';
import { KubeService } from '../../../kubernetes/store/kube.types';

@Component({
  selector: 'app-kubernetes-service-ports',
  templateUrl: './kubernetes-service-ports.component.html',
  styleUrls: ['./kubernetes-service-ports.component.scss']
})
export class KubernetesServicePortsComponent extends CardCell<KubeService> {
  @Input() row: KubeService;
}
