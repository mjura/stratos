import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'frontend/packages/core/src/environments/environment';
import { ResetPagination } from 'frontend/packages/store/src/actions/pagination.actions';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, startWith } from 'rxjs/operators';

import { SnackBarService } from '../../../../../core/src/shared/services/snackbar.service';
import { AppState } from '../../../../../store/src/app-state';
import { kubeEntityCatalog } from '../kubernetes-entity-catalog';
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

  private action: GetAnalysisReports;

  constructor(
    public kubeEndpointService: KubernetesEndpointService,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>,
    public http: HttpClient,
    private snackbarService: SnackBarService
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

    const allEngines = {
      popeye:
      {
        name: 'PopEye',
        id: 'popeye',
        namespaceAware: true,
        iconUrl: '/core/assets/custom/popeye.png',
        iconWidth: '80',
        descriptionUrl: '/core/assets/custom/popeye.md'
      },
      'kube-score':
      {
        name: 'Kube Score',
        id: 'kube-score',
        namespaceAware: true,
        iconUrl: '/core/assets/custom/kubescore.png',
        iconWidth: '120',
        descriptionUrl: '/core/assets/custom/kubescore.md'
      }
      // {
      //   name: 'Sonobuoy',
      //   id: 'sonobuoy',
      //   namespaceAware: false,
      //   iconUrl: '/core/assets/custom/sonobuoy.png',
      //   iconWidth: '70',
      //   descriptionUrl: '/core/assets/custom/sonobuoy.md'
      // }
    };

    // Determine which analyzers are enabled
    this.analyzers$ = this.store.select('auth').pipe(
      filter(auth => !!auth.sessionData['plugin-config']),
      map(auth => auth.sessionData['plugin-config'].analysisEngines),
      map(engines => engines.split(',').map(e => allEngines[e.trim()]).filter(e => !!e))
    );

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

    this.action = kubeEntityCatalog.analysisReport.actions.getMultiple(this.kubeGuid)
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
    del.subscribe(d => this.refresh());

    return del;
  }

  public refresh() {
    this.store.dispatch(new ResetPagination(this.action, this.action.paginationKey));
    this.store.dispatch(this.action);
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
        const msg = { firstLine: 'Failed to run Analysis Report' };
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
      this.snackbarService.showReturn(msg, ['kubernetes', endpointID, 'analysis'], 'View', 5000);
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
        const msg = { firstLine: 'Failed to run Analysis Report' };
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
        const msg = { firstLine: 'Failed to run Analysis Report' };
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

  public getByID(endpoint: string, id: string): Observable<any> {
    const proxyAPIVersion = environment.proxyAPIVersion;
    const url = `/pp/${proxyAPIVersion}/analysis/reports/${endpoint}/${id}`;
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

        const msg = { firstLine: 'Failed to get Analysis Report' };
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
        const msg = { firstLine: 'Failed to get Analysis Reports by path' };
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
        const msg = { firstLine: 'Failed to get Analysis Report' };
        return of(false);
      })
    );
  }
}
