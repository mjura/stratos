import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesBaseTestModules, KubernetesGuidMock } from '../../../kubernetes.testing.module';
import { HelmReleaseService } from '../../../services/helm-release.service';
import { KubernetesEndpointService } from '../../../services/kubernetes-endpoint.service';
import { HelmReleaseSummaryCardComponent } from './helm-release-summary-card.component';

describe('HelmReleaseSummaryCardComponent', () => {
  let component: HelmReleaseSummaryCardComponent;
  let fixture: ComponentFixture<HelmReleaseSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelmReleaseSummaryCardComponent],
      imports: KubernetesBaseTestModules,
      providers: [
        KubernetesEndpointService,
        KubernetesGuidMock,
        HelmReleaseService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmReleaseSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
