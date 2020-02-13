import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopeyeReportViewerComponent } from './popeye-report-viewer.component';

describe('PopeyeReportViewerComponent', () => {
  let component: PopeyeReportViewerComponent;
  let fixture: ComponentFixture<PopeyeReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopeyeReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopeyeReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
