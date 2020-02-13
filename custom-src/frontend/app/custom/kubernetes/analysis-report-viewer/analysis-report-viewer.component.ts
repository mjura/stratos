import { PopeyeReportViewerComponent } from './popeye-report-viewer/popeye-report-viewer.component';
import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, Type, Input } from '@angular/core';

export interface IReportViewer {
}

@Component({
  selector: 'app-analysis-report-viewer',
  templateUrl: './analysis-report-viewer.component.html',
  styleUrls: ['./analysis-report-viewer.component.scss']
})
export class AnalysisReportViewerComponent implements OnInit, OnDestroy {

  // Component reference for the dynamically created auth form
  @ViewChild('reportViewer', { read: ViewContainerRef, static: true })
  public container: ViewContainerRef;
  private reportComponentRef: ComponentRef<IReportViewer>;

  private id: string;

  @Input('report')
  set report(report: any) {
    if (report === null || report.id === this.id) {
      return;
    }
    this.id = report.id;
    this.updateReport(report);
  }

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
  }

  updateReport(report) {
    if (report.format === 'popeye') {
      this.createComponent(PopeyeReportViewerComponent);
    }
  }

  // Dynamically create the component for the report type type
  createComponent(component: Type<IReportViewer>) {
    if (!component || !this.container) {
      return;
    }

    if (this.reportComponentRef) {
      this.reportComponentRef.destroy();
    }
    const factory = this.resolver.resolveComponentFactory<IReportViewer>(component);
    this.reportComponentRef = this.container.createComponent<IReportViewer>(factory);
    // this.authFormComponentRef.instance.formGroup = this.endpointForm;
  }

  ngOnDestroy() {
    if (this.reportComponentRef) {
      this.reportComponentRef.destroy();
    }
  }
}
