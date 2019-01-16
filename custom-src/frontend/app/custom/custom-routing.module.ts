import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const kubernetes: Routes = [{
  path: 'kubernetes',
  loadChildren: 'app/custom/kubernetes/kubernetes.module#KubernetesModule',
  data: {
    stratosNavigation: {
      text: 'Kubernetes',
      matIcon: 'kubernetes',
      matIconFont: 'stratos-icons',
      position: 60,
      requiresEndpointType: 'k8s'
    }
  },
},
{
  path: 'caasp',
  loadChildren: 'app/custom/caasp/caasp.module#CaaspModule',
  data: {
    stratosNavigation: {
      text: 'SUSE CaaSP',
      matIcon: 'caasp',
      matIconFont: 'stratos-icons',
      position: 60,
      requiresEndpointType: 'caasp'
    }
  }
}];

@NgModule({
  imports: [
    RouterModule.forRoot(kubernetes),
  ],
  declarations: []
})
export class CustomRoutingModule { }
