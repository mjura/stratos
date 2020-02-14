import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map, catchError, startWith, tap, delay } from 'rxjs/operators';

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

  id: string;

  constructor(public http: HttpClient, route: ActivatedRoute) {
    const parts = route.snapshot.params;
    this.id = parts.id;
  }

  ngOnInit() {
    const proxyAPIVersion = environment.proxyAPIVersion;

    // Fetch the report
    const url = `/pp/${proxyAPIVersion}/analysis/reports/${this.id}`;
    const headers = new HttpHeaders({});
    const requestArgs = {
      headers
    };

    this.report$ = this.http.get(url, requestArgs).pipe(
      map((response: any) => {
        this.errorMsg.next('');
        return response;
      }),
      catchError((e, c) => {
        const msg = { firstLine: 'Failed to load Analysis Report'};
        this.errorMsg.next(msg);
        return of(false);
      })
    );

    this.isLoading$ = this.report$.pipe(
      map(() => false),
      startWith(true)
    );

    this.report$.subscribe(data => console.log(data));
  }
}
