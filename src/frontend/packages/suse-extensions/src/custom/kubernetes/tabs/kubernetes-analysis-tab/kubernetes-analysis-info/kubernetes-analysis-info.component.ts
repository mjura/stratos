import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KubernetesAnalysisService } from '../../../services/kubernetes.analysis.service';
import { getParentURL } from '../../../services/route.helper';


@Component({
  selector: 'app-kubernetes-analysis-info',
  templateUrl: './kubernetes-analysis-info.component.html',
  styleUrls: ['./kubernetes-analysis-info.component.scss'],
  providers: [
    KubernetesAnalysisService
  ]
})
export class KubernetesAnalysisInfoComponent {

  public breadcrumbs = [];

  constructor(
    route: ActivatedRoute,
    public analysisService: KubernetesAnalysisService
  ) {
    this. breadcrumbs = [
      { value: 'Analysis', routerLink: getParentURL(route) },
      { value: 'Analyzer Info' },
    ];    
  }
}
