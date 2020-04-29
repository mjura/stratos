import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClairReportSeveritySummaryComponent } from './clair-report-severity-summary.component';

describe('ClairReportSeveritySummaryComponent', () => {
  let component: ClairReportSeveritySummaryComponent;
  let fixture: ComponentFixture<ClairReportSeveritySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClairReportSeveritySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClairReportSeveritySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
