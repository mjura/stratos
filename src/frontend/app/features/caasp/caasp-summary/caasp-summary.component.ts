import { Component, OnInit } from '@angular/core';
import { endpointEntitiesSelector } from '../../../store/selectors/endpoint.selectors';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { Http } from '@angular/http';
import { tap } from 'rxjs/operators';
import { ListConfig } from '../../../shared/components/list/list.component.types';
import { GetCaaspInfo, CaaspInfoSchema } from '../../../store/actions/caasp.actions';
import { CaaspNodesListConfigService } from '../../../shared/components/list/list-types/caasp-nodes/caasp-nodes-list-config.service';
import { getPaginationObservables } from '../../../store/reducers/pagination-reducer/pagination-reducer.helper';
import { PaginationMonitorFactory } from '../../../shared/monitors/pagination-monitor.factory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-caasp-summary',
  templateUrl: './caasp-summary.component.html',
  styleUrls: ['./caasp-summary.component.scss'],
  providers: [{
    provide: ListConfig,
    useClass: CaaspNodesListConfigService,
  }]
})
export class CaaspSummaryComponent implements OnInit {

  [x: string]: any;
  metadata: any;
  // stats: {
  //   total: 0,
  //   masters: 0,
  //   workers: 0,
  // };
  stats: any;


  constructor(
    private http: Http,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private paginationMonitorFactory: PaginationMonitorFactory,
  ) {}

  colorScheme: any;
  chartData: any;

  sub: Subscription;

  chartData$: any;

  ngOnInit() {
    
    //this.fetch();

    const { caaspId } = this.activatedRoute.snapshot.params;
    //this.store.dispatch(new GetCaaspInfo(caaspId));

    //this.store.dispatch(new LoggerDebugAction(message));
    this.colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    this.chartData = [
      {
        "name": "Master",
        "value": 0
      },
      {
        "name": "Worker",
        "value": 0
      }
    ];

    const action = new GetCaaspInfo(caaspId);
    const observe = getPaginationObservables<any>({
      store: this.store,
      action,
      paginationMonitor: this.paginationMonitorFactory.create(
        action.paginationKey,
        CaaspInfoSchema
      )
    }, true);

    this.chartData$ = observe.entities$.map(data => {
      const minions = data[0].assigned_minions || [];
      this.chartData[0].value = minions.filter(m => m.role === 'master').length;
      this.chartData[1].value = minions.filter(m => m.role === 'worker').length;
      return this.chartData;
    });
  }

  downloadKubeConfig() {
    const { caaspId } = this.activatedRoute.snapshot.params;
    const url = "/pp/v1/caasp/" + caaspId + "/kubeConfig?kubeconfig.yaml";
    window.open(url, "_download");
  }
}
