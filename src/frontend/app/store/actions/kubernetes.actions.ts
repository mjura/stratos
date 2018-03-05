import { Schema, schema } from 'normalizr';

import { PaginatedAction } from '../types/pagination.types';
import { getPaginationKey } from './pagination.actions';

export const KUBE_INFO_ENTITY_KEY = 'kubernetesInfo';

export const GET_INFO = '[KUBERNETES Endpoint] Get Info';

export const KubernetesInfoSchema = new schema.Entity(KUBE_INFO_ENTITY_KEY);

/**
 * Action to request the information for a given Kubernetes cluster
 */
export class GetKubernetesInfo implements PaginatedAction {
  constructor(public kubeGuid) {
    console.log('>>>' + kubeGuid);
    this.paginationKey = getPaginationKey(KubernetesInfoSchema.key, kubeGuid);
  }
  type = GET_INFO;
  entity = KubernetesInfoSchema;
  entityKey = KubernetesInfoSchema.key;
  actions = [
    //GET_INFO,
    //GET_INFO_SUCCESS,
    //GET_INFO_SUCCESS
  ];
  paginationKey: string;
}
