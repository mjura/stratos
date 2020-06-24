import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GetApplication } from '../../../../../../../../cloud-foundry/src/actions/application.actions';
import { cfEntityFactory } from '../../../../../../../../cloud-foundry/src/cf-entity-factory';
import { MDAppModule } from '../../../../../../../../core/src/core/md.module';
import { SharedModule } from '../../../../../../../../core/src/shared/shared.module';
import { generateTestEntityServiceProvider } from '../../../../../../../../core/test-framework/entity-service.helper';
import { generateTestApplicationServiceProvider } from '../../../../../../../test-framework/application-service-helper';
import { generateCfStoreModules } from '../../../../../../../test-framework/cloud-foundry-endpoint-service.helper';
import { applicationEntityType } from '../../../../../../cf-entity-types';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { ApplicationEnvVarsHelper } from '../build-tab/application-env-vars.service';
import { MetricsTabComponent } from './metrics-tab.component';

describe('MetricsTabComponent', () => {
  let component: MetricsTabComponent;
  let fixture: ComponentFixture<MetricsTabComponent>;
  const appId = '1';
  const cfId = '2';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsTabComponent],
      imports: [
        ...generateCfStoreModules(),
        SharedModule,
        MDAppModule,
        NoopAnimationsModule
      ],
      providers: [
        ApplicationStateService,
        ApplicationEnvVarsHelper,
        generateTestEntityServiceProvider(
          appId,
          cfEntityFactory(applicationEntityType),
          new GetApplication(appId, cfId)
        ),
        generateTestApplicationServiceProvider(cfId, appId),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
