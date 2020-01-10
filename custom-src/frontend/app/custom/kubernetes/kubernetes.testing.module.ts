import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CATALOGUE_ENTITIES, EntityCatalogFeatureModule } from '../../../../store/src/entity-catalog.module';
import { entityCatalog, TestEntityCatalog } from '../../../../store/src/entity-catalog/entity-catalog.service';
import { createBasicStoreModule } from '../../../../store/testing/public-api';
import { generateStratosEntities } from '../../base-entity-types';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { generateKubernetesEntities } from './kubernetes-entity-generator';
import { BaseKubeGuid } from './kubernetes-page.types';

@NgModule({
  imports: [{
    ngModule: EntityCatalogFeatureModule,
    providers: [
      {
        provide: CATALOGUE_ENTITIES, useFactory: () => {
          const testEntityCatalog = entityCatalog as TestEntityCatalog;
          testEntityCatalog.clear();
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
