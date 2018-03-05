import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { ApplicationService } from '../../../../../features/applications/application.service';
import { GetAppEnvVarsAction } from '../../../../../store/actions/app-metadata.actions';
import { AppVariablesAdd, AppVariablesEdit } from '../../../../../store/actions/app-variables.actions';
import { getPaginationKey } from '../../../../../store/actions/pagination.actions';
import { AppState } from '../../../../../store/app-state';
import { APIResource } from '../../../../../store/types/api.types';
import { AppEnvVarSchema, AppEnvVarsState } from '../../../../../store/types/app-metadata.types';
import { ListDataSource } from '../../data-sources-controllers/list-data-source';
import { IListConfig } from '../../list.component.types';
import { KubernetesInfoSchema, GetKubernetesInfo } from '../../../../../store/actions/kubernetes.actions';
import { BaseKubeGuid } from '../../../../../features/kubernetes/kubernetes-page.types';

export interface KubernetesNodeInfo {
  metadata: {
    name: string;
  },
}

export class KubernetesNodesDataSource extends ListDataSource<KubernetesNodeInfo, any> {

  constructor(
    store: Store<AppState>,
    kubeGuid: BaseKubeGuid,
    listConfig: IListConfig<KubernetesNodeInfo>
  ) {
    super({
      store,
      action: new GetKubernetesInfo(kubeGuid.guid),
      schema: KubernetesInfoSchema,
      getRowUniqueId: object => object.name,
    //   getEmptyType: () => ({ name: '', value: '', }),
      paginationKey: getPaginationKey(KubernetesInfoSchema.key, kubeGuid.guid ),
      transformEntity: map(variables => {
        console.log('HERE');
        console.log(variables);
        if (!variables || variables.length === 0) {
          return [];
        }
        const data = variables[0];
        //const rows = [...Object.values(variables[0])];
        //const rows = Object.keys(data).map(name => ({ name, value: data[name] }));
        const rows = <KubernetesNodeInfo[]>Object.values(data);
        console.log(rows);
        return rows;
      }),
      isLocal: true,
      //transformEntities: [{ type: 'filter', field: 'name' }],
      listConfig
    });
  }

}
