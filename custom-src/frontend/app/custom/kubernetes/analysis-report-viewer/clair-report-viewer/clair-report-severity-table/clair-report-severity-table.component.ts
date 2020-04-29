import { Component, OnInit } from '@angular/core';

import { TableCellCustom } from '../../../../../shared/components/list/list.types';
import { Vulnerability } from './../clair-report.types';

@Component({
  selector: 'app-clair-report-severity-table',
  templateUrl: './clair-report-severity-table.component.html',
  styleUrls: ['./clair-report-severity-table.component.scss']
})
export class ClairReportSeverityTableComponent extends TableCellCustom<Vulnerability> implements OnInit {

  public severity: string;

  public iconClasses: string[] = [];

  ngOnInit() {
    this.severity = this.row.Severity;
    this.iconClasses = [ 'clair-severity__' + this.severity.toLowerCase() ];
  }

}
