import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisReportSelectorComponent } from './analysis-report-selector.component';

describe('AnalysisReportSelectorComponent', () => {
  let component: AnalysisReportSelectorComponent;
  let fixture: ComponentFixture<AnalysisReportSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisReportSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisReportSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
