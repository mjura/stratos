import { Action, Store } from '@ngrx/store';
import { denormalize, schema, Schema } from 'normalizr';
import { Observable } from 'rxjs/Observable';
import { first, map, skipWhile, takeWhile } from 'rxjs/operators';

import { pathGet } from '../../core/utils.service';
import { PaginationMonitor } from '../../shared/monitors/pagination-monitor';
import { SetInitialParams } from '../actions/pagination.actions';
import { AppState } from '../app-state';
import { getAPIRequestDataState } from '../selectors/api.selectors';
import { APIResource, NormalizedResponse } from '../types/api.types';
import { PaginatedAction } from '../types/pagination.types';
import { IRequestAction, WrapperRequestActionSuccess } from '../types/request.types';
import { pick } from './reducer.helper';
import { FetchRelationAction } from '../actions/relation.actions';
import { entityFactory } from './entity-factory';

export function generateEntityRelationKey(parentKey: string, childKey) {
  return `${parentKey}-${childKey}`;
}

// /**
//  * Provides a way for a collection of child entities to populate a parent entity with itself,.. or request child entities if missing
//  *
//  * @export
//  * @class EntityRelation
//  */
// export class EntityRelation {
//   /**
//    * Unique id for this entity relationship. For example `org-space-relation`
//    */
//   key: string;
//   /**
//    * The entity schema key of the parent that should contain the child entities
//    */
//   parentEntityKey: string;
//   /**
//    * The entity schema of the child
//    */
//   childEntity: schema.Entity | EntityInlineChild;
//   /**
//    * Create a new parent that contains the child entities. For example <org>.entity.<spaces>
//    */
//   createParentWithChild: (state, parentGuid: string, response: NormalizedResponse) => APIResource;
//   /**
//    * An action that will fetch missing child entities
//    */
//   fetchChildrenAction: (url: string, resource: APIResource) => EntityInlineChildAction;
//   // fetchChildrenAction: (resource: APIResource, includeRelations: string[], populateMissing?: boolean) => EntityInlineChildAction;
//   /**
//    * Create the pagination key that is associated with the action to fetch the children
//    */
//   static createPaginationKey = (schemaKey: string, guid: string) => `${schemaKey}-${guid}`;
// }

export function entityRelationCreatePaginationKey(schemaKey: string, guid: string) { return `${schemaKey}-${guid}`; }

/**
 * Defines an schema entity array which should exist as a parameter in a parent entity. For example a space array in a parent organisation.
 * Also provides a framework to populate a parent entity's parameter with itself. For example we've fetched the space array and it needs
 * to be stored in the parent organisation's entity.
 *
 * @export
 * @class EntityInlineChild
 * @extends {schema.Array}
 */
export class EntityInlineChild extends schema.Array {
  key: string;
  schema: Schema;
  static is(value): boolean {
    return !!value.parentRelations;
  }
  constructor(
    // public parentRelations: EntityRelation[],
    public entitySchema: schema.Entity,
    schemaAttribute?: string | schema.SchemaFunction) {
    super(entitySchema, schemaAttribute); {
    }
    this.key = entitySchema.key;
    this.schema = entitySchema['schema'];
  }
}

/**
 * Helper interface. Actions with entities that are children of a parent entity should specify the parent guid.
 *
 * @export
 * @interface EntityInlineChildAction
 */
export interface EntityInlineChildAction extends PaginatedAction {
  parentGuid: string;
}

export function isEntityInlineParentAction(action: Action) {
  return action && !!action['includeRelations'];
}

/**
 * Helper interface. Actions that are a parent of children entities should have these included parent-child relations
 *
 * @export
 * @interface EntityInlineParentAction
 * @extends {PaginatedAction}
 */
export interface EntityInlineParentAction extends IRequestAction {
  includeRelations: string[];
  populateMissing: boolean;
}

/**
 * An object to represent the action and monitor for a missing inline depth/entity relation. For instance, if spaces are missing from an
 * organisation then the action would be for GetAllOrganisationSpaces and the paginationMonitor would contain a monitor for that pagination
 * section
 *
 * @export
 * @interface ValidateEntityResult
 */
export interface ValidateEntityResult {
  action: Action;
  paginationMonitor?: PaginationMonitor;
}

function handleRelation({
  store,
  allEntities,
  entities,
  parentEntitySchemaKey,
  parentEntity,
  childEntitySchemaKey,
  childEntitySchema,
  childEntitiesUrl,
  populateExisting,
  populateMissing
}): ValidateEntityResult[] {
  let results = [];
  // Step 2) Determine what actions, if any, need to be raised given the state of the relationship and children
  // No relevant relation, skip
  if (!childEntitySchema) {
    return results;
  }

  function createParamAction() {
    return new FetchRelationAction(
      parentEntity.entity.cfGuid,
      parentEntity.metadata.guid,
      childEntitiesUrl,
      childEntitySchema,
      childEntitySchemaKey, // TODO: RC routesInSpaceKey??
      entityRelationCreatePaginationKey(parentEntitySchemaKey, parentEntity.metadata.guid)
    );
  }

  // Have we found some entities that need to go into the pagination store OR are some entities missing that are required?
  if (entities && populateExisting) {
    if (!allEntities) {
      return results;
    }
    const paramAction = createParamAction();
    // We've got the value already, ensure we create a pagination section for them
    const guids = entities.map(entity => entity.metadata.guid);
    const normalizedEntities = pick(allEntities[childEntitySchemaKey], guids as [string]);
    const paginationSuccess = new WrapperRequestActionSuccess(
      {
        entities: {
          [childEntitySchemaKey]: normalizedEntities
        },
        result: guids
      },
      paramAction,
      'fetch',
      entities.length,
      1
    );
    results.push({
      action: paginationSuccess,
      paginationMonitor: new PaginationMonitor(store, paramAction.paginationKey, childEntitySchema)
    });
  } else if (!entities && populateMissing) {
    const paramAction = createParamAction();
    // The values are missing and we want them, go fetch
    results = [].concat(results, [{
      action: new SetInitialParams(paramAction.entityKey, paramAction.paginationKey, paramAction.initialParams, true)
    },
    {
      action: paramAction,
      paginationMonitor: new PaginationMonitor(store, paramAction.paginationKey, childEntitySchema)
    }
    ]);
  }
  return results;
}

/**
 * Inner loop for validateEntityRelations. Does two parts
 * 1) Iterates through the schema of an entity alongside an entity. For example a schema could be
 * ```
 * {
 *  entity: {
 *    spaces: SpacesSchema  {
 *                            entity: {
 *                              routes: RoutesSchema
 *                            }
 *                          }
 *  }
 * }
 * ```
 * whilst a entity structure could be
 * ```
 * {
 *  entity: {
 *    spaces: [
 *      xyz: {
 *        routes: [
 *        ]
 *      }
 *    ]
 *  }
 * }
 * ```
 * We'd recurse through both structures at the same time, ensuring all entities (parent, space, route) checking the state of each defined
 * relationship (parent-space, space-route)
 *
 * 2) Check for missing or existing inline relations
 * At each state of the recursion ensure all entities at that level (spaces, routes) satisfy any configured relationship (parent-space,
 * space-route).
 *
 * @param {{
 *     store: Store<AppState>,
 *     action: EntityInlineParentAction,
 *     allEntities: {},
 *     populateExisting: boolean,
 *     populateMissing: boolean,
 *     parentEntity: any,
 *     entities: any[],
 *     parentEntitySchemaKey: string,
 *     parentEntitySchemaParam,
 *     childRelation: EntityRelation,
 *     path: string,
 *   }} config
 * @returns {ValidateEntityResult[]}
 */
function validationLoop(
  config: {
    store: Store<AppState>,
    action: EntityInlineParentAction,
    allEntities: tempAppStore,
    populateExisting: boolean,
    populateMissing: boolean,
    parentEntity: any,
    entities: any[],
    parentEntitySchemaKey: string,
    parentEntitySchemaParam: any,
    path: string,
  }
)
  : ValidateEntityResult[] {
  let results = [];

  const {
    store,
    action,
    allEntities,
    populateExisting,
    populateMissing,
    parentEntity,
    entities,
    parentEntitySchemaKey,
    parentEntitySchemaParam,
    path
  } = config;

  // Step 1) Iterate through the entities schema structure discovering all the entities and whether they need to be checked for relations
  if (entities) {
    Object.keys(parentEntitySchemaParam).forEach(key => {
      const value = parentEntitySchemaParam[key];
      const arraySafeValue = value['length'] > 0 ? value[0] : value;

      if (arraySafeValue instanceof EntityInlineChild || arraySafeValue instanceof schema.Entity) {
        let schema: EntityInlineChild | schema.Entity = arraySafeValue;
        schema = (schema as EntityInlineChild).entitySchema || schema;
        if (!validRelation(parentEntitySchemaKey, schema.key, action.includeRelations)) {
          return;
        }
        const newPath = path.length ? path + '.' + key : key;
        entities.forEach(entity => {
          let childEntities = pathGet(newPath, entity);
          if (childEntities && childEntities.length && typeof (childEntities[0]) === 'string') {
            childEntities = denormalize(childEntities, value, allEntities);
          }
          results = [].concat(results, handleRelation({
            store,
            allEntities,
            entities: childEntities,
            parentEntitySchemaKey,
            parentEntity: entity,
            childEntitySchemaKey: schema.key,
            childEntitySchema: value,
            childEntitiesUrl: pathGet(newPath + '_url', entity),
            populateExisting,
            populateMissing
          }));
          // The actual check is step two of validation loop, but only after we've tried to discover if this child has any children
          // it needs validating
          results = [].concat(results,
            validationLoop({
              ...config,
              parentEntity: entity,
              entities: childEntities,
              parentEntitySchemaKey: schema.key,
              parentEntitySchemaParam: schema['schema'],
              path: ''
            }));
        });
      } else if (arraySafeValue instanceof Object) {
        // This isn't a relation, continue checking it's children
        results = [].concat(results, validationLoop({
          ...config,
          parentEntitySchemaParam: arraySafeValue,
          path: path.length ? path + '.' + key : key
        }));
      }
    });
  }

  return results;
}

export class tempAppStore { // TODO: RC
  [entityKey: string]: {
    [guid: string]: any;
  }
}
/**
 * Ensure all required inline parameters specified by the entity associated with the request exist.
 * If the inline parameter/s are..
 * - missing - (optionally) return an action that will fetch them and ultimately store in a pagination. This will also populate the parent
 * entities inline parameter (see the generic request data reducer).
 * - exist - (optionally) return an action that will store them in pagination.
 *
 * @export
 * @param {Store<AppState>} store //TODO: RC Check all
 * @param {IRequestAction} action The action that has fetched the collection of entities
 * @param {any[]} parentEntities Collection of parent entities whose children may be missing
 * @param {boolean} [populateMissing=false] If a child is missing, should we raise an action to fetch it?
 * @param {boolean} [populateExisting=false] If a child exists, should we raise an action to store it as a pagination list?
 * @returns {Observable<{
 *     allFinished: Observable<any>,
 *     entityResults: ValidateEntityResult[]
 *   }>}
 */
export function validateEntityRelations(
  store: Store<AppState>,
  allEntities: tempAppStore,
  action: IRequestAction,
  parentEntities: any[],
  populateMissing = false,
  populateExisting = false): {
    allFinished: Observable<any>,
    entities: Observable<tempAppStore>
  } {

  const emptyResponse = {
    allFinished: Observable.of(true),
    entities: Observable.of(null)
  };
  // Does the entity associated with the action have inline params that need to be validated?
  const parentEntitySchema = extractActionEntitySchema(action);
  if (!parentEntitySchema) {
    return emptyResponse;
  }

  // Do we have entities in the response to validate?
  if (!parentEntities || !parentEntities.length) {
    return emptyResponse;
  }
  const relationAction = action as EntityInlineParentAction;

  const results = validationLoop({
    store,
    action: relationAction,
    allEntities,
    populateExisting,
    populateMissing: populateMissing || relationAction.populateMissing,
    parentEntity: null,
    entities: parentEntities,
    parentEntitySchemaKey: parentEntitySchema['key'],
    parentEntitySchemaParam: parentEntitySchema['schema'],
    path: ''
  });

  const paginationFinished = new Array<Observable<any>>(Observable.of(true));
  results.forEach(newActions => {
    store.dispatch(newActions.action);
    // TODO: RC Failures?
    if (newActions.paginationMonitor) {
      const obs = newActions.paginationMonitor.fetchingCurrentPage$.pipe(
        skipWhile(fetching => !fetching),
        takeWhile(fetching => fetching)
      );
      paginationFinished.push(obs);
    }
  });

  return {
    allFinished: Observable.zip(...paginationFinished),
    entities: Observable.of(null)
  };
  // This is a .first, so automatically closes
  // observable.subscribe();
  // return observable;

}

function extractActionEntitySchema(action: IRequestAction): {
  key: string;
} {
  return extractEntitySchema(action.entity);
}

function extractEntitySchema(entity) {
  if (EntityInlineChild.is(entity)) {
    entity = (entity as EntityInlineChild).entitySchema;
  } else {
    entity = entity['length'] > 0 ? entity[0] : entity;
  }
  return entity;
}

export interface ListRelationsResult {
  maxDepth: number;
  relations: string[];
}
export function listRelations(action: EntityInlineParentAction): ListRelationsResult {
  const res = {
    maxDepth: 0,
    relations: []
  };
  const parentEntitySchema = extractActionEntitySchema(action);
  if (!parentEntitySchema) {
    return res;
  }

  loop(res, action.includeRelations, parentEntitySchema.key, parentEntitySchema['schema']);
  return res;
}

function loop(res: ListRelationsResult, includeRelations: string[], parentEntitySchemaKey: string, parentEntitySchemaObj: string) {
  let haveDelved = false;
  Object.keys(parentEntitySchemaObj).forEach(key => {
    let value = parentEntitySchemaObj[key];
    value = value['length'] > 0 ? value[0] : value;
    const entityKey = value instanceof EntityInlineChild ? value.entitySchema.key : value.key;
    const entitySchema = value instanceof EntityInlineChild ? value.entitySchema['schema'] : value['schema'];
    if (res.relations.indexOf(key) >= 0) {
      return;
    }

    if (value instanceof EntityInlineChild || value instanceof schema.Entity) {
      if (validRelation(parentEntitySchemaKey, entityKey, includeRelations)) {
        res.relations.push(key);
        haveDelved = true;
      }
      loop(res, includeRelations, entityKey, entitySchema);
    } else if (value instanceof Object) {
      loop(res, includeRelations, parentEntitySchemaKey, value);
    }
  });
  if (haveDelved) {
    res.maxDepth++;
  }
}

function validRelation(parentSchemaKey: string, childSchemaKey: string, includeRelations: string[] = []): boolean {
  return includeRelations.indexOf(`${parentSchemaKey}-${childSchemaKey}`) >= 0;
}
