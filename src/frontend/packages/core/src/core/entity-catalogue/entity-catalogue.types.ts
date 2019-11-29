import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GeneralEntityAppState } from '../../../../store/src/app-state';
import {
  ApiErrorMessageHandler,
  PreApiRequest,
  PrePaginationApiRequest,
  SuccessfulApiResponseDataMapper,
} from '../../../../store/src/entity-request-pipeline/entity-request-pipeline.types';
import {
  PaginationPageIteratorConfig,
} from '../../../../store/src/entity-request-pipeline/pagination-request-base-handlers/pagination-iterator.pipe';
import { EntitySchema } from '../../../../store/src/helpers/entity-schema';
import { StratosStatus } from '../../shared/shared.types';
import { EndpointAuthTypeConfig } from '../extension/extension-types';
import { Omit } from '../utils.service';

export interface EntityCatalogueEntityConfig {
  entityType: string;
  endpointType: string;
  subType?: string;
  schemaKey?: string;
}

export interface ActionBuilderConfig<T extends Record<any, any> = Record<any, any>> {
  actionMetadata?: T;
  entityGuid: string;
  endpointGuid?: string;
}

export type EntityActionBuilderEntityConfig = EntityCatalogueEntityConfig & ActionBuilderConfig;

export const extractEntityCatalogueEntityConfig = (ecec: Partial<EntityCatalogueEntityConfig>): EntityCatalogueEntityConfig => {
  const { entityType, endpointType, subType, schemaKey } = ecec;
  return { entityType, endpointType, subType, schemaKey };
};

export interface EntityCatalogueSchemas {
  default: EntitySchema;
  [schemaKey: string]: EntitySchema;
}
export interface IStratosEntityWithIcons {
  icon?: string;
  iconFont?: string;
}

export interface IEntityMetadata {
  name: string;
  [key: string]: string;
}

/**
 * Static information describing a base stratos entity.
 *
 * @export
 */
export interface IStratosBaseEntityDefinition<T = EntitySchema | EntityCatalogueSchemas> extends IStratosEntityWithIcons {
  readonly type?: string;
  readonly schema: T;
  readonly label?: string;
  readonly labelPlural?: string;
  readonly renderPriority?: number;
  /**
   * Show custom content in the endpoints list. Should be Type<EndpointListDetailsComponent>
   */
  readonly listDetailsComponent?: any;
  readonly parentType?: string;
  readonly subTypes?: Omit<IStratosBaseEntityDefinition, 'schema' | 'subTypes'>[];
  readonly paginationConfig?: PaginationPageIteratorConfig;
  readonly tableConfig?: EntityTableConfig<any>;
}



/**
 * Static information describing a stratos endpoint.
 *
 * @export
 */
export interface IStratosEndpointDefinition<T = EntityCatalogueSchemas | EntitySchema> extends IStratosBaseEntityDefinition<T> {
  readonly logoUrl: string;
  readonly tokenSharing?: boolean;
  readonly urlValidation?: boolean;
  readonly unConnectable?: boolean;
  /**
   * Indicates if this endpoint type is in tech preview and should only be shown when tech preview mode is enabled
   */
  readonly techPreview?: boolean;
  readonly urlValidationRegexString?: string;
  readonly authTypes: EndpointAuthTypeConfig[];
  readonly subTypes?: Omit<IStratosEndpointDefinition, 'schema' | 'subTypes'>[];
  // Allows an entity to manipulate the data that is returned from an api request before it makes it into the store.
  // This will be used for all entities with this endpoint type.
  readonly globalSuccessfulRequestDataMapper?: SuccessfulApiResponseDataMapper;
  // Allows an entity to manipulate the request object before it's sent.
  // This will be used for all entities with this endpoint type unless the entity has it's own prerequest config.
  readonly globalPreRequest?: PreApiRequest;
  readonly globalPrePaginationRequest?: PrePaginationApiRequest;
  readonly globalErrorMessageHandler?: ApiErrorMessageHandler;
}

export interface StratosEndpointExtensionDefinition extends Omit<IStratosEndpointDefinition, 'schema'> { }
export interface EntityTableConfig<T = any> {
  rowBuilders: EntityRowBuilder<T>[];
  showHeader?: boolean;
}
/**
 * Static information describing a stratos entity.
 *
 * @export
 */
export interface IStratosEntityDefinition<
  T = EntitySchema | EntityCatalogueSchemas,
  E = any,
  I = E
  > extends IStratosBaseEntityDefinition<T> {
  readonly endpoint: StratosEndpointExtensionDefinition;
  readonly subTypes?: Omit<IStratosEntityDefinition, 'schema' | 'subTypes' | 'endpoint'>[];
  // Allows an entity to manipulate the data that is returned from an api request before it makes it into the store.
  // This will override any globalSuccessfulRequestDataMapper found in the endpoint.
  // TODO We should wrap this and the global version with immer to make them immutable.
  readonly successfulRequestDataMapper?: SuccessfulApiResponseDataMapper<E, I> | 'false' | string;
  // Allows an entity to manipulate the request object before it's sent.
  // This will override any globalPreRequest found in the endpoint.
  readonly preRequest?: PreApiRequest;
  readonly prePaginationRequest?: PrePaginationApiRequest;
  readonly errorMessageHandler?: ApiErrorMessageHandler;
  // Should the request response object for this entity be parsed as if it's passed through the jetstream backend?
  readonly nonJetstreamRequest?: boolean;
  readonly nonJetstreamRequestHandler?: NonJetstreamRequestHandler;
}

export class NonJetstreamRequestHandler<T = any> {
  isSuccess: (request: T) => boolean;
  getErrorCode?: (request: T) => string;
}

export interface IStratosEntityActions extends Partial<IStratosEntityWithIcons> {
  readonly label: string;
  readonly action: () => void;
  readonly actionable?: Observable<boolean>;
  readonly disabled?: Observable<boolean>;
}
export type EntityRowBuilder<T> = [string, (entity: T, store?: Store<GeneralEntityAppState>) => string | Observable<string>];

export interface IStratosEntityBuilder<T extends IEntityMetadata, Y = any> {
  getMetadata(entity: Y): T;
  getStatusObservable?(entity: Y): Observable<StratosStatus>;
  // TODO This should be used in the entities schema.
  getGuid(entityMetadata: T): string;
  getPreviewableComponent?(): object;
  getLink?(entityMetadata: T): string;
  getLines?(): EntityRowBuilder<T>[];
  getSubTypeLabels?(entityMetadata: T): {
    singular: string,
    plural: string
  };
  /**
   * Actions that don't effect an individual entity i.e. create new
   * @returns global actions
   */
  getGlobalActions?(): IStratosEntityActions[];
  /**
   * Actions that effect on individual entity i.e. rename
   * @returns global actions
   */
  getActions?(entityMetadata: T): IStratosEntityActions[];
}

export interface IStratosEntityData<T extends IEntityMetadata = IEntityMetadata> {
  metadata: T;
  link: string;
  guid: string;
  lines: [string, string | Observable<string>][];
  actions?: IStratosEntityActions[];
  globalActions?: IStratosEntityActions[];
}

export interface IStratosEntityStatusData<Y extends IEntityMetadata = IEntityMetadata> extends IStratosEntityData<Y> {
  status$?: Observable<StratosStatus>;
}