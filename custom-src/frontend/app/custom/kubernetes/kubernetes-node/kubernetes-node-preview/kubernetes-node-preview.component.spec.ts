import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  KubernetesActivatedRouteMock,
  KubernetesBaseTestModules,
  KubernetesGuidMock,
} from '../../kubernetes.testing.module';
import { KubernetesEndpointService } from '../../services/kubernetes-endpoint.service';
import { KubernetesNodeService } from '../../services/kubernetes-node.service';
import { KubernetesNodePreviewComponent } from './kubernetes-node-preview.component';

describe('KubernetesNodePreviewComponent', () => {
  let component: KubernetesNodePreviewComponent;
  let fixture: ComponentFixture<KubernetesNodePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KubernetesNodePreviewComponent],
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
    fixture = TestBed.createComponent(KubernetesNodePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
