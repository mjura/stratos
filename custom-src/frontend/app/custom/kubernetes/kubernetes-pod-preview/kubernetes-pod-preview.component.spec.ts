import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesActivatedRouteMock, KubernetesBaseTestModules, KubernetesGuidMock } from '../kubernetes.testing.module';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { KubernetesNodeService } from '../services/kubernetes-node.service';
import { KubernetesPodPreviewComponent } from './kubernetes-pod-preview.component';

describe('KubernetesPodPreviewComponent', () => {
  let component: KubernetesPodPreviewComponent;
  let fixture: ComponentFixture<KubernetesPodPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KubernetesPodPreviewComponent],
      providers: [
        KubernetesEndpointService,
        KubernetesNodeService,
        KubernetesActivatedRouteMock,
        KubernetesGuidMock
      ],
      imports: [...KubernetesBaseTestModules]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesPodPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
