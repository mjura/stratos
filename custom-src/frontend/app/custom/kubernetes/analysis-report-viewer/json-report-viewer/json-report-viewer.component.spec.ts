import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonReportViewerComponent } from './json-report-viewer.component';

describe('JsonReportViewerComponent', () => {
  let component: JsonReportViewerComponent;
  let fixture: ComponentFixture<JsonReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
