import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KubernetesComponent } from './kubernetes/kubernetes.component';
import { KubernetesRoutingModule } from './kubernetes.routing';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { KubernetesNodesTabComponent } from './tabs/kubernetes-nodes-tab/kubernetes-nodes-tab.component';
import { KubernetesTabBaseComponent } from './kubernetes-tab-base/kubernetes-tab-base.component';
import { KubernetesService } from './services/kubernetes.service';
import { BaseKubeGuid } from './kubernetes-page.types';
import { KubernetesEndpointService } from './services/kubernetes-endpoint.service';
@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,    
    KubernetesRoutingModule,
  ],
  declarations: [KubernetesComponent, KubernetesNodesTabComponent, KubernetesTabBaseComponent],
  providers: [
    KubernetesService,
    BaseKubeGuid,
    KubernetesEndpointService,
  ]
})
export class KubernetesModule { }
