import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesBaseTestModules, KubernetesGuidMock } from '../../../kubernetes.testing.module';
import { HelmReleaseService } from '../../../services/helm-release.service';
import { KubernetesEndpointService } from '../../../services/kubernetes-endpoint.service';
import { KubeNamespacePodCountComponent } from './kube-namespace-pod-count.component';

describe('KubeNamespacePodCountComponent', () => {
  let component: KubeNamespacePodCountComponent;
  let fixture: ComponentFixture<KubeNamespacePodCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KubeNamespacePodCountComponent],
      imports: KubernetesBaseTestModules,
      providers: [KubernetesGuidMock, HelmReleaseService, KubernetesEndpointService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeNamespacePodCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
