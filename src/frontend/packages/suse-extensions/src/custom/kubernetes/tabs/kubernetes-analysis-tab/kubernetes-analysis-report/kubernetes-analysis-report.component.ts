import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

import { KubernetesEndpointService } from '../../../services/kubernetes-endpoint.service';
import { KubernetesAnalysisService } from '../../../services/kubernetes.analysis.service';

@Component({
  selector: 'app-kubernetes-analysis-report',
  templateUrl: './kubernetes-analysis-report.component.html',
  styleUrls: ['./kubernetes-analysis-report.component.scss']
})
export class KubernetesAnalysisReportComponent implements OnInit {

  report$: Observable<any>;
  private errorMsg = new Subject<any>();
  errorMsg$ = this.errorMsg.pipe(startWith(''));
  isLoading$: Observable<boolean>;

  endpointID: string;
  id: string;

  constructor(
    private analysisService: KubernetesAnalysisService,
    route: ActivatedRoute,
    private kubeEndpointService: KubernetesEndpointService
  ) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit() {
    this.report$ = this.analysisService.getByID(this.kubeEndpointService.baseKube.guid, this.id).pipe(
      map((response: any) => {
        if (!response.type) {
          this.error();
          return false;
        }
        this.errorMsg.next('');
        return response;
      }),
      catchError((e, c) => {
        this.error();
        return of(false);
      })
    );

    this.isLoading$ = this.report$.pipe(
      map(() => false),
      startWith(true)
    );
  }

  error() {
    const msg = { firstLine: 'Failed to load Analysis Report'};
    this.errorMsg.next(msg);
  }
}


