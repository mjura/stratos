import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { KubernetesAnalysisService } from '../../services/kubernetes.analysis.service';
import { ListConfig } from 'frontend/packages/core/src/shared/components/list/list.component.types';
import { AnalysisReportsListConfig } from '../../list-types/analysis-reports-list-config.service';
import { environment } from '../../../../environments/environment';
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
export class KubernetesAnalysisTabComponent implements OnInit {

  infoLink: string;

  constructor(
    public kubeEndpointService: KubernetesEndpointService,
    public analysisService: KubernetesAnalysisService,
    public http: HttpClient
  ) {
    const guid = this.kubeEndpointService.baseKube.guid;
    this.infoLink = `/kubernetes/${guid}/analysis/info`;
   }

  ngOnInit() { }

  public runAnalysis(id: string) {
    this.analysisService.run(id, this.kubeEndpointService.baseKube.guid);
  }
}
