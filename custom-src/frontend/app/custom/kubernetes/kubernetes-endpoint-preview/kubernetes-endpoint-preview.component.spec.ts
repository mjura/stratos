import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesActivatedRouteMock, KubernetesBaseTestModules, KubernetesGuidMock } from '../kubernetes.testing.module';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { KubernetesEndpointPreviewComponent } from './kubernetes-endpoint-preview.component';

describe('KubernetesEndpointPreviewComponent', () => {
  let component: KubernetesEndpointPreviewComponent;
  let fixture: ComponentFixture<KubernetesEndpointPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KubernetesEndpointPreviewComponent],
      providers: [
        KubernetesEndpointService,
        KubernetesActivatedRouteMock,
        KubernetesGuidMock
      ],
      imports: [...KubernetesBaseTestModules]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesEndpointPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
