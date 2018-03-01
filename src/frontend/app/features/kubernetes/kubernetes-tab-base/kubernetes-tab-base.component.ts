import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseKube } from '../kubernetes-page.types';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';

function getKubeIdFromUrl(activatedRoute: ActivatedRoute) {
  return {
    guid: activatedRoute.snapshot.params.kubeId
  };
}

@Component({
  selector: 'app-kubernetes-tab-base',
  templateUrl: './kubernetes-tab-base.component.html',
  styleUrls: ['./kubernetes-tab-base.component.scss'],
  providers: [
    {
      provide: BaseKube,
      useFactory: getKubeIdFromUrl,
      deps: [
        ActivatedRoute
      ]
    },
  ]
})
export class KubernetesTabBaseComponent implements OnInit {

  tabLinks = [
    { link: 'nodes', label: 'Nodes' },
    { link: 'pods', label: 'Pods' },
  ];

  isFetching$: Observable<boolean>;

  constructor(private kubeEndpointService: KubernetesEndpointService) { }

  ngOnInit() {
    this.isFetching$ = Observable.of(false);
  }

}
