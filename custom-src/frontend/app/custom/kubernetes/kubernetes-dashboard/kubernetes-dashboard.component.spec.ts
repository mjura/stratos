import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavService } from '../../../../tab-nav.service';
import { BaseKubeGuid } from '../kubernetes-page.types';
import { KubernetesBaseTestModules, KubernetesGuidMock } from '../kubernetes.testing.module';
import { KubernetesDashboardTabComponent } from './kubernetes-dashboard.component';

describe('KubernetesDashboardTabComponent', () => {
  let component: KubernetesDashboardTabComponent;
  let fixture: ComponentFixture<KubernetesDashboardTabComponent>;

  beforeEach(async(() => {
    TestBed.overrideProvider(BaseKubeGuid, KubernetesGuidMock);
    TestBed.configureTestingModule({
      declarations: [KubernetesDashboardTabComponent],
      imports: [...KubernetesBaseTestModules],
      providers: [TabNavService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesDashboardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
