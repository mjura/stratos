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
    console.log(this.id);
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

        // Make the response easier to render

        response.report.popeye.sanitizers.forEach(s => {
          const groups = [];
          let totalIssues = 0;
          if (s.issues) {
            Object.keys(s.issues).forEach(key => {
              const issues = s.issues[key];
              totalIssues += issues.length;
              if (issues.length > 0) {
                groups.push({
                  name: key,
                  issues
                });
              }
            });
            s.hide = totalIssues === 0;
          } else {
            s.hide = true;
          }
          s.groups = groups;
          // delete s.issues;
        });
        return response.report;
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

  public getIssueGroups(section) {
    const groups = [];
    console.log(section);
    if (!section.issues) {
      return [];
    }
    Object.keys(section.issues).forEach(key => {
      const issues = section.issues[key];
      if (issues.length > 0) {
        groups.push({
          name: key,
          issues
        });
      }
    });
    return groups;
  }
}
