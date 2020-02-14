import { Component } from '@angular/core';

import { HelmReleaseHelperService } from '../helm-release-helper.service';
import { KubernetesAnalysisService } from '../../../../services/kubernetes.analysis.service';
import { Subject } from 'rxjs';
import { AnalysisReport } from '../../../../store/kube.types';

@Component({
  selector: 'app-helm-release-analysis-tab',
  templateUrl: './helm-release-analysis-tab.component.html',
  styleUrls: ['./helm-release-analysis-tab.component.scss']
})
export class HelmReleaseAnalysisTabComponent {

  public report$ = new Subject<AnalysisReport>();

  path: string;

  currentReport = null;

  constructor(
    public analaysisService: KubernetesAnalysisService,
    public helmReleaseHelper: HelmReleaseHelperService
  ) {
    this.path = `${this.helmReleaseHelper.namespace}/${this.helmReleaseHelper.releaseTitle}`;
   }

  public analysisChanged(report) {
    if (report.id !== this.currentReport) {
      this.currentReport = report.id;
      this.analaysisService.getByID(report.id).subscribe(r => this.report$.next(r));
    }
  }

}
