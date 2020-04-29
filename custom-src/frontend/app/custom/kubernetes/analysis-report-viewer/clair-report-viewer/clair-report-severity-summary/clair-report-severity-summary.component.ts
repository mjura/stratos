import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clair-report-severity-summary',
  templateUrl: './clair-report-severity-summary.component.html',
  styleUrls: ['./clair-report-severity-summary.component.scss']
})
export class ClairReportSeveritySummaryComponent {

  private severityTotals;

  public severities: string[] = [];

  public iconClassNames = {};

  @Input()
  set totals(totals) {
    this.severityTotals = totals;
    this.iconClassNames = {};
    this.severities = Object.keys(totals);
    this.severities.forEach(s => {
      this.iconClassNames[s] = 'clair-severity__' + s.toLowerCase();
    });
  }

  get totals() {
    return this.severityTotals;
  }

}
