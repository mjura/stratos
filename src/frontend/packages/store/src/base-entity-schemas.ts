import {
  endpointSchemaKey,
  entityFactory,
  systemInfoSchemaKey,
  userFavouritesSchemaKey,
  userProfileSchemaKey,
} from './helpers/entity-factory';
import { EntitySchema } from './helpers/entity-schema';

export const metricEntityType = 'metrics';

export const STRATOS_ENDPOINT_TYPE = 'stratos';
export const ENDPOINT_TYPE = 'endpoint';

class StratosEntitySchema extends EntitySchema {
  constructor(entityType: string) {
    super(entityType, STRATOS_ENDPOINT_TYPE);
  }
}

export const userFavoritesEntitySchema = new StratosEntitySchema(entityFactory(userFavouritesSchemaKey).entityType);
export const endpointEntitySchema = new StratosEntitySchema(entityFactory(endpointSchemaKey).entityType);
export const userProfileEntitySchema = new StratosEntitySchema(entityFactory(userProfileSchemaKey).entityType);
export const systemInfoEntitySchema = new StratosEntitySchema(entityFactory(systemInfoSchemaKey).entityType);
