import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmReleaseAnalysisTabComponent } from './helm-release-analysis-tab.component';

describe('HelmReleaseAnalysisTabComponent', () => {
  let component: HelmReleaseAnalysisTabComponent;
  let fixture: ComponentFixture<HelmReleaseAnalysisTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelmReleaseAnalysisTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmReleaseAnalysisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
