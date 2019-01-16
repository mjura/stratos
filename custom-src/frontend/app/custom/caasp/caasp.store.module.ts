import { CoreModule } from './../../../../../src/frontend/app/core/core.module';
import { NgModule } from '@angular/core';

import { StratosExtension } from '../../core/extension/extension-service';
import { EndpointTypeConfig } from '../../core/extension/extension-types';
import { caaspEntityKeys, caaspEntities } from './store/caasp.entities';

const caaspEndpointTypes: EndpointTypeConfig[] = [{
  value: 'caasp',
  label: 'SUSE CAASP',
  authTypes: ['creds'],
  icon: 'caasp',
  iconFont: 'stratos-icons',
  homeLink: (guid) => ['/caasp', guid],
  entitySchemaKeys: caaspEntityKeys
}];

@StratosExtension({
  endpointTypes: caaspEndpointTypes,
  authTypes: [],
  entities: caaspEntities,
})
@NgModule({
  imports: [
    CoreModule
  ]
})
export class CaaspStoreModule { }
