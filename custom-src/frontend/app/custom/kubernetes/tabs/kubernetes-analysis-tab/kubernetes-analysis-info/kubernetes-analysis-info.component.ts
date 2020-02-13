
import { Component } from '@angular/core';
import { KubernetesAnalysisService } from '../../../services/kubernetes.analysis.service';

@Component({
  selector: 'app-kubernetes-analysis-info',
  templateUrl: './kubernetes-analysis-info.component.html',
  styleUrls: ['./kubernetes-analysis-info.component.scss'],
  providers: [
    KubernetesAnalysisService
  ]
})
export class KubernetesAnalysisInfoComponent {

  constructor(public analysisService: KubernetesAnalysisService) { }

}
