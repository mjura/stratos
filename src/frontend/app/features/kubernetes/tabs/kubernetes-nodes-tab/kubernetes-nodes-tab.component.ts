import { Component, OnInit } from '@angular/core';
import { ListConfig } from '../../../../shared/components/list/list.component.types';
import { KubernetesNodesListConfigService } from '../../../../shared/components/list/list-types/kubernetes-nodes/kubernetes-nodes-list-config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kubernetes-nodes-tab',
  templateUrl: './kubernetes-nodes-tab.component.html',
  styleUrls: ['./kubernetes-nodes-tab.component.scss'],
  providers: [{
    provide: ListConfig,
    useClass: KubernetesNodesListConfigService,
  }]
})
export class KubernetesNodesTabComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
