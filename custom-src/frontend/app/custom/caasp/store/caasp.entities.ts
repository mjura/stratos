import { getAPIResourceGuid } from '../../../store/selectors/api.selectors';
import { ExtensionEntitySchema } from '../../../core/extension/extension-types';

export const caaspInfoSchemaKey = 'caaspInfo';

export const caaspEntities: ExtensionEntitySchema[] = [
  {
    entityKey: caaspInfoSchemaKey,
    definition: {},
    options: { idAttribute: getAPIResourceGuid }
  }
];

export const caaspEntityKeys: string[] = [
  caaspInfoSchemaKey,
];
