import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { flatMap, mergeMap } from 'rxjs/operators';

import {
  KUBE_INFO_ENTITY_KEY,
  GET_INFO,
  GetKubernetesInfo
} from '../actions/kubernetes.actions';
import { NormalizedResponse } from '../types/api.types';
import {
  StartRequestAction,
  WrapperRequestActionFailed,
  WrapperRequestActionSuccess
} from '../types/request.types';
import { environment } from './../../../environments/environment';
import { AppState } from './../app-state';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class KubernetesEffects {
  proxyAPIVersion = environment.proxyAPIVersion;
  constructor(
    private http: Http,
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

  @Effect()
  fetchInfo$ = this.actions$.ofType<GetKubernetesInfo>(GET_INFO).pipe(
    flatMap(action => {
			this.store.dispatch(new StartRequestAction(action));
			const headers = new Headers({ 'x-cap-cnsi-list': action.kubeGuid });
			const requestArgs = {
				headers: headers
			};
      return this.http
        .get(`/pp/${this.proxyAPIVersion}/proxy/api/v1/nodes`, requestArgs)
        .pipe(
          mergeMap(response => {
            const info = response.json();
            const mappedData = {
              entities: { kubernetesInfo: {} },
              result: []
            } as NormalizedResponse;
            const id = action.kubeGuid;
            mappedData.entities[KUBE_INFO_ENTITY_KEY][id] = info[id].items;
						mappedData.result.push(id);
						console.log('KUBE DATA');
						console.log(info[id].items);
            return [
              new WrapperRequestActionSuccess(mappedData, action)
            ];
          }),
          catchError(err => [
            new WrapperRequestActionFailed(err.message, action)
          ])
        );
    })
  );
}
