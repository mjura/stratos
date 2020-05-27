import { Component, ComponentFactoryResolver, Injector, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of as observableOf, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, first, map, pairwise, startWith, withLatestFrom } from 'rxjs/operators';

import { RouterNav } from '../../../../../../store/src/actions/router.actions';
import { entityCatalog } from '../../../../../../store/src/entity-catalog/entity-catalog.service';
import { safeUnsubscribe } from '../../../../core/utils.service';
import { ITableColumn } from '../../../../shared/components/list/list-table/table.types';
import { KUBERNETES_ENDPOINT_TYPE } from '../../kubernetes-entity-factory';
import { KubeConfigAuthHelper } from '../kube-config-auth.helper';
import { KubeConfigFileCluster, KubeConfigImportAction, KubeImportState } from '../kube-config.types';
import { RegisterEndpoint } from './../../../../../../store/src/actions/endpoint.actions';
import { AppState } from './../../../../../../store/src/app-state';
import { EndpointsEffect } from './../../../../../../store/src/effects/endpoint.effects';
import { endpointSchemaKey } from './../../../../../../store/src/helpers/entity-factory';
import { ActionState } from './../../../../../../store/src/reducers/api-request-reducer/types';
import { selectUpdateInfo } from './../../../../../../store/src/selectors/api.selectors';
import { STRATOS_ENDPOINT_TYPE } from './../../../../base-entity-schemas';
import { EndpointsService } from './../../../../core/endpoints.service';
import {
  ConnectEndpointConfig,
  ConnectEndpointData,
  ConnectEndpointService,
} from './../../../../features/endpoints/connect.service';
import {
  ITableListDataSource,
  RowState,
} from './../../../../shared/components/list/data-sources-controllers/list-data-source-types';
import { StepOnNextFunction } from './../../../../shared/components/stepper/step/step.component';
import {
  KubeConfigTableImportStatusComponent,
} from './kube-config-table-import-status/kube-config-table-import-status.component';

const REGISTER_ACTION = 'Register endpoint';
const CONNECT_ACTION = 'Connect endpoint';

@Component({
  selector: 'app-kube-config-import',
  templateUrl: './kube-config-import.component.html',
  styleUrls: ['./kube-config-import.component.scss']
})
export class KubeConfigImportComponent implements OnDestroy {

  public dataSource: ITableListDataSource<KubeConfigImportAction>;
  public columns: ITableColumn<KubeConfigImportAction>[] = [];

  done = new BehaviorSubject<boolean>(false);
  done$: Observable<boolean>;
  busy = new BehaviorSubject<boolean>(false);
  busy$: Observable<boolean>;
  data = new BehaviorSubject<KubeConfigImportAction[]>([]);
  data$: Observable<KubeConfigImportAction[]>;

  subs: Subscription[] = [];

  private endpointEntityKey = entityCatalog.getEntityKey(STRATOS_ENDPOINT_TYPE, endpointSchemaKey);
  private connectService: ConnectEndpointService;

  constructor(
    public store: Store<AppState>,
    public resolver: ComponentFactoryResolver,
    private injector: Injector,
    private fb: FormBuilder,
    private endpointsService: EndpointsService,
  ) {
    this.data$ = this.data.asObservable();
    this.done$ = this.done.asObservable();
    this.busy$ = this.busy.asObservable();

    this.dataSource = {
      connect: () => this.data$,
      disconnect: () => { },
      trackBy: (index, item) => item.cluster.name,
      isTableLoading$: this.data$.pipe(map(data => !(data && data.length > 0))),
      getRowState: (row: KubeConfigImportAction): Observable<RowState> => {
        return row ? row.state.asObservable() : observableOf({});
      }
    } as ITableListDataSource<KubeConfigImportAction>;

    // Right-hand column to show the action progress
    const monitorColumn = {
      columnId: 'monitorState',
      cellComponent: KubeConfigTableImportStatusComponent,
      cellConfig: (row) => row.actionState.asObservable(),
      cellFlex: '0 0 24px'
    };

    // Table columns
    this.columns = [
      {
        columnId: 'action', headerCell: () => 'Action',
        cellDefinition: {
          valuePath: 'action'
        },
        cellFlex: '1',
      },
      {
        columnId: 'description', headerCell: () => 'Description',
        cellDefinition: {
          valuePath: 'description'
        },
        cellFlex: '4',
      },
      monitorColumn
    ];

    // Subscribe to the data and kick off the actions to perform the operations
    // We only listen to the first item which is sent when the data is set on entry to the step
    this.subs.push(this.data$.pipe(
      filter((data => data && data.length > 0)),
      first()
    ).subscribe(imports => {
      // Go through the imports and dispatch the actions to perform them in sequence
      this.processAction([...imports]);
    }));
  }

  // Process the next action in the list
  private processAction(actions: KubeConfigImportAction[]) {
    if (actions.length === 0) {
      // We are done
      this.done.next(true);
      this.busy.next(false);
      return;
    }

    // Get the next action
    const i = actions.shift();
    if (i.action === REGISTER_ACTION) {
      this.doRegister(i, actions);
    } else if (i.action === CONNECT_ACTION) {
      this.doConnect(i, actions);
    } else {
      i.state.next({ message: 'Skipping this action due to a previous error', warning: true });
      // Do the next action
      this.processAction(actions);
    }
  }

  private doRegister(reg: KubeConfigImportAction, next: KubeConfigImportAction[]) {
    console.log('Registering endpoint');
    const obs$ = this.registerEndpoint(reg.cluster.name, reg.cluster.cluster.server);
    const mainObs$ = this.getUpdatingState(obs$).pipe(
      startWith({ busy: true, error: false, completed: false})
    );
    this.subs.push(mainObs$.subscribe(reg.actionState));
    reg.actionState.subscribe(state => {
      console.log('registering state');
      console.log(state);
    });

    const sub = reg.actionState.subscribe(progress => {
      // Not sure wha tthe status is used for?
      reg.status = progress;
      if (progress.error && progress.message) {
        // Mark all dependency jobs as skip
        next.forEach(action => {
          if (action.depends === reg) {
            // Mark it as skipped by setting the action to null
            action.action = null;
            action.state.next({ message: 'Skipping action as endpoint could not be registered', warning: true });
          }
        });
        reg.state.next({ message: progress.message, error: true });
      }
      if (progress.completed) {
        if (!progress.error) {
          // If we created okay, then guid is in the message
          console.log('ENDPOINT REGISTERED');
          reg.cluster._guid = progress.message;
        }
        sub.unsubscribe();
        // Do the next one
        this.processAction(next);
      }
    });
    this.subs.push(sub);
  }

  private doConnect(connect: KubeConfigImportAction, next: KubeConfigImportAction[]) {
    console.log('Connecting endpoint');
    const helper = new KubeConfigAuthHelper();
    const data = helper.getAuthDataForConnect(this.resolver, this.injector, this.fb, connect.user);
    if (data) {
      // const obs$ = this.connectEndpoint(connect, data).pipe(
      //   map((status: any) => ({ busy: false, error: !status.success,  completed: true })),
      //   startWith({ busy: true, error: false, completed: false })
      // );
      const obs$ = this.connectEndpoint(connect, data);

      // Echo obs$ to the behaviour subject
      this.subs.push(obs$.subscribe(connect.actionState));

      this.subs.push(connect.actionState.subscribe(status => {
        console.log('connecting status...');
        console.log(status);
      }));

      this.subs.push(connect.actionState.pipe(filter(status => status.completed), first()).subscribe(status => {
        console.log('connect completed');
        if (status.error) {
          connect.state.next({ message: status.errorMessage, error: true });
        }
        this.processAction(next);
      }));
    }
  }

  ngOnDestroy() {
    safeUnsubscribe(...this.subs);

    if (this.connectService) {
      this.connectService.destroy();
    }
  }

  // Register the endpoint
  private registerEndpoint(name, url: string) {
    // TODO: Skip SSL should not default to true
    const action = new RegisterEndpoint(KUBERNETES_ENDPOINT_TYPE, null, name, url, true, '', '', false);
    this.store.dispatch(action);
    const update$ = this.store.select(
      selectUpdateInfo(this.endpointEntityKey, action.guid(), EndpointsEffect.registeringKey)
    ).pipe(filter(update => !!update));
    return update$;
  }

  // Connect to an endpoint
  private connectEndpoint(action: KubeConfigImportAction, pData: ConnectEndpointData) {
    const config: ConnectEndpointConfig = {
      name: action.cluster.name,
      guid: action.depends.cluster._guid || action.cluster._guid,
      type: null,
      subType: action.user._authData.subType,
      ssoAllowed: false
    };

    if (this.connectService) {
      this.connectService.destroy();
    }
    this.connectService = new ConnectEndpointService(this.store, this.endpointsService, config);
    this.connectService.setData(pData);
    this.connectService.submit();
    return this.connectService.getConnectingObservable();
  }

  // Enter the step - process the list of clusters to import
  onEnter = (data: KubeConfigFileCluster[]) => {
    const imports: KubeConfigImportAction[] = [];
    this.busy.next(true);
    data.forEach(item => {
      if (item._selected) {
        const register = {
          action: REGISTER_ACTION,
          description: `Register "${item.name}" with the URL "${item.cluster.server}"`,
          cluster: item,
          state: new BehaviorSubject<RowState>({}),
          actionState: new BehaviorSubject<any>({}),
        };
        // Only include if the endpoint does not already exist
        if (!item._guid) {
          imports.push(register);
        }
        const user = item._users.find(u => u.name === item._user);
        if (user) {
          imports.push({
            action: CONNECT_ACTION,
            description: `Connect "${item.name}" with the user "${user.name}"`,
            cluster: item,
            user,
            state: new BehaviorSubject<RowState>({}),
            depends: register,
            actionState: new BehaviorSubject<any>({}),
          });
        }
      }
    });

    this.data.next(imports);
  }

  // Finish - go back to the endpoints view
  onNext: StepOnNextFunction = () => {
    this.store.dispatch(new RouterNav({ path: ['endpoints'] }));
    return observableOf({ success: true });
  }

  // These two should be somewhere else
  private getUpdatingState(actionState$: Observable<ActionState>): Observable<KubeImportState> {
    const completed$ = this.getHasCompletedObservable(actionState$.pipe(map(requestState => requestState.busy)));
    return actionState$.pipe(
      pairwise(),
      withLatestFrom(completed$),
      map(([[oldRequestState, requestState], completed]) => {
         return {
          busy: requestState.busy,
          error: requestState.error,
          completed,
          message: requestState.message,
        };
      })
    );
  }

  private getHasCompletedObservable(busy$: Observable<boolean>) {
    return busy$.pipe(
      distinctUntilChanged(),
      pairwise(),
      map(([oldBusy, newBusy]) => oldBusy && !newBusy),
      startWith(false),
    );
  }

}
