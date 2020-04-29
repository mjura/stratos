import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClairReportSeverityTableComponent } from './clair-report-severity-table.component';

describe('ClairReportSeverityTableComponent', () => {
  let component: ClairReportSeverityTableComponent;
  let fixture: ComponentFixture<ClairReportSeverityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClairReportSeverityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClairReportSeverityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
