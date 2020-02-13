import { AnalysisReport } from './../../../../../../../../../../../custom-src/frontend/app/custom/kubernetes/store/kube.types';
import { Component, OnInit } from '@angular/core';

import { HelmReleaseHelperService } from '../helm-release-helper.service';
import { KubernetesAnalysisService } from '../../../../services/kubernetes.analysis.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-helm-release-analysis-tab',
  templateUrl: './helm-release-analysis-tab.component.html',
  styleUrls: ['./helm-release-analysis-tab.component.scss']
})
export class HelmReleaseAnalysisTabComponent implements OnInit {

  public report$: Observable<AnalysisReport>;

  constructor(
    public analaysisService: KubernetesAnalysisService,
    public helmReleaseHelper: HelmReleaseHelperService
  ) {

    const path = `${this.helmReleaseHelper.namespace}/${this.helmReleaseHelper.releaseTitle}`;

    this.report$ = this.analaysisService.getLatest(helmReleaseHelper.endpointGuid, path);

    // this.analaysisService.getLatest(helmReleaseHelper.endpointGuid, path).subscribe(
    //   report => {
    //     console.log('Got report');
    //     console.log(report);
    //   }
    // );


   }

  ngOnInit() {
  }

}
