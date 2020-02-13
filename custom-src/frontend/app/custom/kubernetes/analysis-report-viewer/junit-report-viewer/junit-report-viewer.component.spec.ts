import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JUnitReportViewerComponent } from './junit-report-viewer.component';

describe('JUnitReportViewerComponent', () => {
  let component: JUnitReportViewerComponent;
  let fixture: ComponentFixture<JUnitReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JUnitReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JUnitReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
