import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { KubernetesAnalysisService } from '../../services/kubernetes.analysis.service';
import { ListConfig } from 'frontend/packages/core/src/shared/components/list/list.component.types';
import { AnalysisReportsListConfig } from '../../list-types/analysis-reports-list-config.service';
import { KubernetesEndpointService } from '../../services/kubernetes-endpoint.service';

@Component({
  selector: 'app-kubernetes-analysis-tab',
  templateUrl: './kubernetes-analysis-tab.component.html',
  styleUrls: ['./kubernetes-analysis-tab.component.scss'],
  providers: [
    KubernetesAnalysisService,
    {
      provide: ListConfig,
      useClass: AnalysisReportsListConfig,
    }
  ]
})
export class KubernetesAnalysisTabComponent {

  infoLink: string;

  constructor(
    public kubeEndpointService: KubernetesEndpointService,
    public analysisService: KubernetesAnalysisService,
    public http: HttpClient
  ) {
    const guid = this.kubeEndpointService.baseKube.guid;
    this.infoLink = `/kubernetes/${guid}/analysis/info`;
   }

  public runAnalysis(id: string) {
    this.analysisService.run(id, this.kubeEndpointService.baseKube.guid);
  }
}
