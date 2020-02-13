import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesAnalysisInfoComponent } from './kubernetes-analysis-info.component';

describe('KubernetesAnalysisInfoComponent', () => {
  let component: KubernetesAnalysisInfoComponent;
  let fixture: ComponentFixture<KubernetesAnalysisInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubernetesAnalysisInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesAnalysisInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
