import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavService } from '../../../../tab-nav.service';
import { BaseKubeGuid } from '../kubernetes-page.types';
import { KubernetesBaseTestModules, KubernetesGuidMock } from '../kubernetes.testing.module';
import { KubernetesNodeComponent } from './kubernetes-node.component';

describe('KubernetesNodeComponent', () => {
  let component: KubernetesNodeComponent;
  let fixture: ComponentFixture<KubernetesNodeComponent>;

  beforeEach(async(() => {
    TestBed.overrideProvider(BaseKubeGuid, KubernetesGuidMock);
    TestBed.configureTestingModule({
      declarations: [KubernetesNodeComponent],
      imports: KubernetesBaseTestModules,
      providers: [TabNavService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
