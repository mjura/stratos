import { IRequestEntityTypeState, IRequestTypeState } from '../app-state';
import {
  appEnvVarsSchemaKey,
  appStatsSchemaKey,
  appSummarySchemaKey,
  privateDomainsSchemaKey,
  spaceQuotaSchemaKey,
} from '../helpers/entity-factory';
import { RequestInfoState } from '../reducers/api-request-reducer/types';
import { APIResource } from './api.types';
import { EndpointModel } from './endpoint.types';

export interface IRequestDataInternal<T> extends IRequestTypeState {
  application: IRequestEntityTypeState<T>;
  stack: IRequestEntityTypeState<T>;
  space: IRequestEntityTypeState<T>;
  organization: IRequestEntityTypeState<T>;
  route: IRequestEntityTypeState<T>;
  event: IRequestEntityTypeState<T>;
  system: IRequestEntityTypeState<T>;
  githubBranches: IRequestEntityTypeState<T>;
  githubCommits: IRequestEntityTypeState<T>;
  domain: IRequestEntityTypeState<T>;
  user: IRequestEntityTypeState<T>;
  serviceInstance: IRequestEntityTypeState<T>;
  servicePlan: IRequestEntityTypeState<T>;
  service: IRequestEntityTypeState<T>;
  serviceBinding: IRequestEntityTypeState<T>;
  buildpack: IRequestEntityTypeState<T>;
  securityGroup: IRequestEntityTypeState<T>;
  featureFlag: IRequestEntityTypeState<T>;
  private_domains: IRequestEntityTypeState<T>;
  space_quota_definition: IRequestEntityTypeState<T>;
}

export interface IRequestDataState extends IRequestDataInternal<APIResource> {
  endpoint: IRequestEntityTypeState<EndpointModel>;
}

export interface IRequestState extends IRequestDataInternal<RequestInfoState> {
  endpoint: IRequestEntityTypeState<RequestInfoState>;
}


export const defaultCfEntitiesState = {
  application: {},
  stack: {},
  space: {},
  organization: {},
  route: {},
  event: {},
  endpoint: {},
  githubBranches: {},
  user: {},
  domain: {},
  [appEnvVarsSchemaKey]: {},
  [appStatsSchemaKey]: {},
  [appSummarySchemaKey]: {},
  serviceInstance: {}, // TODO: RC
  servicePlan: {},
  service: {},
  serviceBinding: {},
  buildpack: {},
  securityGroup: {},
  featureFlag: {},
  [privateDomainsSchemaKey]: {},
  [spaceQuotaSchemaKey]: {}
};
