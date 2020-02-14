import { AnalysisReport } from './../../../../../../../../../../../custom-src/frontend/app/custom/kubernetes/store/kube.types';
import { Component, OnInit } from '@angular/core';

import { HelmReleaseHelperService } from '../helm-release-helper.service';
import { KubernetesAnalysisService } from '../../../../services/kubernetes.analysis.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-helm-release-analysis-tab',
  templateUrl: './helm-release-analysis-tab.component.html',
  styleUrls: ['./helm-release-analysis-tab.component.scss']
})
export class HelmReleaseAnalysisTabComponent implements OnInit {

  public report$ = new Subject<AnalysisReport>();

  path: string;

  currentReport = null;

  constructor(
    public analaysisService: KubernetesAnalysisService,
    public helmReleaseHelper: HelmReleaseHelperService
  ) {

    this.path = `${this.helmReleaseHelper.namespace}/${this.helmReleaseHelper.releaseTitle}`;

    //this.report$ = this.analaysisService.getLatest(helmReleaseHelper.endpointGuid, this.path);

    // this.analaysisService.getLatest(helmReleaseHelper.endpointGuid, path).subscribe(
    //   report => {
    //     console.log('Got report');
    //     console.log(report);
    //   }
    // );


   }

  ngOnInit() {
  }

  public analysisChanged(report) {
    console.log('new report selected');
    console.log(report);
    if (report.id !== this.currentReport) {
      this.currentReport = report.id;
      this.analaysisService.getByID(report.id).subscribe(r => this.report$.next(r));
    }
  }

}
