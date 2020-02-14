import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubeScoreReportViewerComponent } from './kube-score-report-viewer.component';

describe('KubeScoreReportViewerComponent', () => {
  let component: KubeScoreReportViewerComponent;
  let fixture: ComponentFixture<KubeScoreReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubeScoreReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeScoreReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
