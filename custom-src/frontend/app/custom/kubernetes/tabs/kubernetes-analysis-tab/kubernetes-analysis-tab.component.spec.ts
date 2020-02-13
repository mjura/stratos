import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesAnalysisTabComponent } from './kubernetes-analysis-tab.component';

describe('KubernetesAnalysisTabComponent', () => {
  let component: KubernetesAnalysisTabComponent;
  let fixture: ComponentFixture<KubernetesAnalysisTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubernetesAnalysisTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesAnalysisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
