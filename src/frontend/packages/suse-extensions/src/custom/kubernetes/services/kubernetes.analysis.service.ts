import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClearPaginationOfType } from 'frontend/packages/store/src/actions/pagination.actions';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

import { RouterNav } from '../../../../../store/src/actions/router.actions';
import { AppState } from '../../../../../store/src/app-state';
import { environment } from '../../../environments/environment';
import { GetAnalysisReports } from '../store/kubernetes.actions';
import { KubernetesEndpointService } from './kubernetes-endpoint.service';
import { KubeScoreReportHelper } from './kubescore-report.helper';
import { PopeyeReportHelper } from './popeye-report.helper';

export interface KubernetesAnalysisType {
  name: string;
  id: string;
  namespaceAware: boolean;
  iconUrl?: string;
  descriptionUrl?: string;
}

@Injectable()
export class KubernetesAnalysisService {
  kubeGuid: string;

  public analyzers$: Observable<KubernetesAnalysisType[]>;
  public namespaceAnalyzers$: Observable<KubernetesAnalysisType[]>;

  public enabled$: Observable<boolean>;
  public hideAnalysis$: Observable<boolean>;

  constructor(
    public kubeEndpointService: KubernetesEndpointService,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>,
    public http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this.kubeGuid = kubeEndpointService.kubeGuid;

    // Is the backend plugin available?
    this.enabled$ = this.store.select('auth').pipe(
      map(auth => auth.sessionData.plugins && auth.sessionData.plugins.analysis)
    );

    this.hideAnalysis$ = this.enabled$.pipe(
      startWith(true),
      map(ok => !ok)
    );

    this.analyzers$ = of([
      {
        name: 'PopEye',
        id: 'popeye',
        namespaceAware: true,
        iconUrl: '/core/assets/custom/popeye.png',
        iconWidth: '80',
        descriptionUrl: '/core/assets/custom/popeye.md'
      },
      {
        name: 'Kube Score',
        id: 'kube-score',
        namespaceAware: true,
        iconUrl: '/core/assets/custom/kubescore.png',
        iconWidth: '120',
        descriptionUrl: '/core/assets/custom/kubescore.md'
      },
      // {
      //   name: 'Sonobuoy',
      //   id: 'sonobuoy',
      //   namespaceAware: false,
      //   iconUrl: '/core/assets/custom/sonobuoy.png',
      //   iconWidth: '70',
      //   descriptionUrl: '/core/assets/custom/sonobuoy.md'
      // }
    ]);

    this.namespaceAnalyzers$ = combineLatest(
      this.analyzers$,
      this.enabled$
    ).pipe(
      map(([a, enabled]) => {
        if (!enabled) {
          return null;
        }
        return a.filter(v => v.namespaceAware);
      })
    );
  }

    public delete(item) {
    if (!Array.isArray(item)) {
      item = [item];
    }

    const ids = [];
    item.forEach(i => ids.push(i.id));

    const proxyAPIVersion = environment.proxyAPIVersion;

    // Fetch the report
    const url = `/pp/${proxyAPIVersion}/analysis/reports`;
    const headers = new HttpHeaders({});
    const requestArgs = {
      headers,
      body: ids
    };

    const del = this.http.delete(url, requestArgs);
    del.subscribe(d => {
      const action = new GetAnalysisReports(this.kubeEndpointService.baseKube.guid);
      this.store.dispatch(new ClearPaginationOfType(action));
      this.store.dispatch(action);
    });

    return del;
  }

  public refresh() {
    const action = new GetAnalysisReports(this.kubeEndpointService.baseKube.guid);
    this.store.dispatch(new ClearPaginationOfType(action));
    this.store.dispatch(action);
  }

  public run(id: string, endpointID: string, namespace?: string, app?: string) {
    const proxyAPIVersion = environment.proxyAPIVersion;
    const body = {
      namespace,
      app,
    };

    // Start an Analysis
    const url = `/pp/${proxyAPIVersion}/analysis/run/${id}/${endpointID}`;
    const headers = new HttpHeaders({});
    const requestArgs = {
      headers,
    };

    const start = this.http.post(url, body, requestArgs).pipe(
      map(response => {
        return response;
      }),
      catchError((e, c) => {
        console.log('Error occurred');
        console.log(e);
        const msg = { firstLine: 'Failed to run Analysis Report'};
        return of(false);
      })
    );

    start.subscribe(a => {
      const type = id.charAt(0).toUpperCase() + id.substring(1);
      let msg;
      if (app) {
        msg = `${type} analysis started for workload '${app}'`;
      } else if (namespace) {
        msg = `${type} analysis started for namespace '${namespace}'`;
      } else {
        msg = `${type} analysis started for the Kubernetes cluster`;
      }
      const ref = this.snackBar.open(msg, 'View', { duration: 5000 });
      ref.onAction().subscribe(() => {
        this.store.dispatch(new RouterNav({ path: ['kubernetes', endpointID, 'analysis'] }));
      });
      this.refresh();
    });
  }

  public getLatestCheck(endpointID: string, path: string): Observable<boolean> {
    return this.getLatestObservable(endpointID, path, true).pipe(
      map(response => response !== false),
    );
  }
  public getLatest(endpointID: string, path: string): Observable<any> {

    const start = this.getLatestObservable(endpointID, path, false).pipe(
      map(response => {
        this.processReport(response);
        return response;
      }),
      catchError((e, c) => {
        console.log('Error occurred');
        console.log(e);
        const msg = { firstLine: 'Failed to run Analysis Report'};
        return of(false);
      })
    );

    return start;
  }

  private getLatestObservable(endpointID: string, path: string, checkExists = false): Observable<any> {
    const proxyAPIVersion = environment.proxyAPIVersion;
    const url = `/pp/${proxyAPIVersion}/analysis/latest/${endpointID}/${path}`;
    const headers = new HttpHeaders({});
    const requestArgs = {
      headers,
    };

    let req;
    if (checkExists) {
      req = this.http.head(url, requestArgs);
    } else {
      req = this.http.get(url, requestArgs);
    }

    return req.pipe(
      catchError((e, c) => {
        console.log('Error occurred');
        console.log(e);
        const msg = { firstLine: 'Failed to run Analysis Report'};
        return of(false);
      })
    );

  }

  private processReport(report: any) {
    // Check the path of the report
    if (report.path.split('/').length !== 2) {
      return;
    }

    switch (report.format) {
      case 'popeye':
        const helper = new PopeyeReportHelper(report);
        helper.map();
        break;
      case 'kubescore':
        const kubeScoreHelper = new KubeScoreReportHelper(report);
        kubeScoreHelper.map();
        break;
      default:
        console.log('Do not know how to handle this report type');
        break;
    }
  }

  public getByID(id: string): Observable<any> {
    const proxyAPIVersion = environment.proxyAPIVersion;
    const url = `/pp/${proxyAPIVersion}/analysis/reports/${id}`;
    const headers = new HttpHeaders({});
    const requestArgs = {
      headers,
    };

    return this.http.get(url, requestArgs).pipe(
      map(response => {
        this.processReport(response);
        return response;
      }),
      catchError((e, c) => {
        console.log('Error occurred');
        console.log(e);
        // TODO: msg not used?

        const msg = { firstLine: 'Failed to get Analysis Report'};
        return of(false);
      })
    );
  }

  public getByPath(endpointID: string, path: string): Observable<any> {
    const proxyAPIVersion = environment.proxyAPIVersion;
    const url = `/pp/${proxyAPIVersion}/analysis/completed/${endpointID}/${path}`;
    const headers = new HttpHeaders({});
    const requestArgs = {
      headers,
    };

    return this.http.get(url, requestArgs).pipe(
      catchError((e, c) => {
        console.log('Error occurred');
        console.log(e);
        // TODO: msg not used?
        const msg = { firstLine: 'Failed to get Analysis Reports by path'};
        return of(false);
      })
    );
  }


  public getReportFile(id: string, file: string): Observable<any> {
    const proxyAPIVersion = environment.proxyAPIVersion;
    const url = `/pp/${proxyAPIVersion}/analysis/reports/${id}/${file}`;
    const headers = new HttpHeaders({});
    const requestArgs = {
      headers,
    };

    return this.http.get(url, requestArgs).pipe(
      catchError((e, c) => {
        console.log('Error occurred');
        console.log(e);
        // TODO: msg not used?
        const msg = { firstLine: 'Failed to get Analysis Report'};
        return of(false);
      })
    );
  }
}
