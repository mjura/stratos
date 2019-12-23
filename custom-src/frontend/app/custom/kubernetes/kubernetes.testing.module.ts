import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { createBasicStoreModule } from '../../../test-framework/store-test-helper';
import { generateStratosEntities } from '../../base-entity-types';
import { CoreModule } from '../../core/core.module';
import { CATALOGUE_ENTITIES, EntityCatalogueFeatureModule } from '../../core/entity-catalogue.module';
import { entityCatalogue, TestEntityCatalogue } from '../../core/entity-catalogue/entity-catalogue.service';
import { SharedModule } from '../../shared/shared.module';
import { generateKubernetesEntities } from './kubernetes-entity-generator';
import { BaseKubeGuid } from './kubernetes-page.types';

@NgModule({
  imports: [{
    ngModule: EntityCatalogueFeatureModule,
    providers: [
      {
        provide: CATALOGUE_ENTITIES, useFactory: () => {
          const testEntityCatalogue = entityCatalogue as TestEntityCatalogue;
          testEntityCatalogue.clear();
          return [
            ...generateStratosEntities(),
            ...generateKubernetesEntities(),
          ];
        }
      }
    ]
  }]
})
export class KubernetesTestingModule { }

export const KubernetesBaseTestModules = [
  KubernetesTestingModule,
  RouterTestingModule,
  CoreModule,
  createBasicStoreModule(),
  NoopAnimationsModule,
  HttpClientModule,
  SharedModule,
];

export const KubernetesActivatedRouteMock = {
  provide: ActivatedRoute,
  useValue: {
    snapshot: {
      queryParams: {},
      params: {
        podName: 'podName123',
        nodeName: 'nodeName123',
        namespaceName: 'namespaceName123',
      },
    }
  }
};

export const KubernetesGuidMock = {
  provide: BaseKubeGuid,
  useValue: {
    guid: '5123:4'
  },
  deps: [
    KubernetesActivatedRouteMock,
  ]
};
