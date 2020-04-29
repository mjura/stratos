import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClairReportDetailComponent } from './clair-report-detail.component';

describe('ClairReportDetailComponent', () => {
  let component: ClairReportDetailComponent;
  let fixture: ComponentFixture<ClairReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClairReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClairReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
