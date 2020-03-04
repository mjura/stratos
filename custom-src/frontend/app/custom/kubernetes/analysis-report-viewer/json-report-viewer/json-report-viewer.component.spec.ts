import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MDAppModule } from './../../../../core/md.module';

import { JsonReportViewerComponent } from './json-report-viewer.component';
import { KubernetesBaseTestModules, KubeBaseGuidMock } from '../../kubernetes.testing.module';
import { KubernetesAnalysisService } from '../../services/kubernetes.analysis.service';
import { KubernetesEndpointService } from '../../services/kubernetes-endpoint.service';

describe('JsonReportViewerComponent', () => {
  let component: JsonReportViewerComponent;
  let fixture: ComponentFixture<JsonReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonReportViewerComponent ],
      imports: [
        KubernetesBaseTestModules,
        MDAppModule
      ],
      providers: [
        KubernetesAnalysisService,
        KubernetesEndpointService,
        KubeBaseGuidMock,
      ]
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
