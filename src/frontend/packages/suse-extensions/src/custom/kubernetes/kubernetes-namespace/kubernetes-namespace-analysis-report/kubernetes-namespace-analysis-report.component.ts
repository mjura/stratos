import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AnalysisReport } from '../../store/kube.types';
import { KubernetesAnalysisService } from '../../services/kubernetes.analysis.service';
import { KubernetesEndpointService } from '../../services/kubernetes-endpoint.service';
import { KubernetesNamespaceService } from '../../services/kubernetes-namespace.service';

@Component({
  selector: 'app-kubernetes-namespace-analysis-report-tab',
  templateUrl: './kubernetes-namespace-analysis-report.component.html',
  styleUrls: ['./kubernetes-namespace-analysis-report.component.scss'],
  providers: [
    KubernetesAnalysisService
  ]
})
export class KubernetesNamespaceAnalysisReportComponent {

  public report$ = new Subject<AnalysisReport>();

  path: string;

  currentReport = null;

  endpointID: string;

  noReportsAvailable = false;

  constructor(
    public analyzerService: KubernetesAnalysisService,
    public endpointService: KubernetesEndpointService,
    public kubeNamespaceService: KubernetesNamespaceService,
  ) {
    this.endpointID = this.endpointService.kubeGuid;
    this.path = `${this.kubeNamespaceService.namespaceName}`;
    this.report$.next(null);
   }

  public analysisChanged(report) {
    if (report.id !== this.currentReport) {
      this.currentReport = report.id;
      this.analyzerService.getByID(report.id).subscribe(r => this.report$.next(r));
    }
  }

  public onReportCount(count: number) {
    this.noReportsAvailable = count === 0;
  }

  public runAnalysis(id: string) {
    this.analyzerService.run(id, this.endpointID, this.kubeNamespaceService.namespaceName);
  }
}