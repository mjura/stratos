import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { KubernetesAnalysisService, KubernetesAnalysisType } from '../../services/kubernetes.analysis.service';

@Component({
  selector: 'app-analysis-report-runner',
  templateUrl: './analysis-report-runner.component.html',
  styleUrls: ['./analysis-report-runner.component.scss']
})
export class AnalysisReportRunnerComponent implements OnInit {

  analyzers$: Observable<KubernetesAnalysisType[]>;
  @Input() kubeId: string;
  @Input() namespace: string;
  @Input() app: string;

  constructor(
    public analysisService: KubernetesAnalysisService,
  ) {
  }

  public runAnalysis(id: string) {
    this.analysisService.run(id, this.kubeId, this.namespace, this.app);
  }

  ngOnInit(): void {
    if (this.namespace) {
      this.analyzers$ = this.analysisService.namespaceAnalyzers$
    } else {
      this.analyzers$ = this.analysisService.analyzers$;
    }
  }

}
