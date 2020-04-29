import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClairReportViewerComponent } from './clair-report-viewer.component';

describe('ClairReportViewerComponent', () => {
  let component: ClairReportViewerComponent;
  let fixture: ComponentFixture<ClairReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClairReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClairReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
