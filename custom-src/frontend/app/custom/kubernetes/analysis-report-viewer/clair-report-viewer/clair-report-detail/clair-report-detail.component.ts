import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ITableColumn } from '../../../../../shared/components/list/list-table/table.types';
import { KubernetesAnalysisService } from '../../../services/kubernetes.analysis.service';
import { ClairReportSeverityTableComponent } from '../clair-report-severity-table/clair-report-severity-table.component';
import { ClairSeverityOrder, Vulnerabilities, Vulnerability } from './../clair-report.types';


@Component({
  selector: 'app-clair-report-detail',
  templateUrl: './clair-report-detail.component.html',
  styleUrls: ['./clair-report-detail.component.scss']
})
export class ClairReportDetailComponent {

  imageReport: any;

  // Report detail loaded from the analysis server
  detail: Vulnerability[];

  busy = new BehaviorSubject<boolean>(true);

  public dataSource: any;

  public columns: ITableColumn<Vulnerability>[] = [];

  data = new BehaviorSubject<Vulnerability[]>([]);

  total = 0;
  patches = 0;

  // Totals as a map by severity
  totals = {};

  @Input() id: string;

  @Input()
  set report(data: any) {
    this.imageReport = data;

    // Feth the data
    this.fetch();
  }

  get report() {
    return this.imageReport;
  }

  constructor(public analysisServer: KubernetesAnalysisService) {

    // Table columns
    this.columns = [
      {
        columnId: 'name', headerCell: () => 'CVE',
        cellDefinition: {
          valuePath: 'Name'
        },
        cellFlex: '2',
      },
      {
        columnId: 'severity', headerCell: () => 'Severity',
        // cellDefinition: {
        //   valuePath: 'Severity'
        // },
        cellComponent: ClairReportSeverityTableComponent,
        cellFlex: '2',
      },
      {
        columnId: 'package', headerCell: () => 'Package',
        cellDefinition: {
          valuePath: 'FeatureName'
        },
        cellFlex: '2',
      },
      {
        columnId: 'current_version', headerCell: () => 'Current Version',
        cellDefinition: {
          valuePath: 'FeatureVersion'
        },
        cellFlex: '2',
      },
      {
        columnId: 'fixed_version', headerCell: () => 'Fixed In Version',
        cellDefinition: {
          valuePath: 'FixedBy'
        },
        cellFlex: '2',
      },
    ];

    // Data source
    this.dataSource = {
      connect: () => this.data.asObservable(),
      disconnect: () => { },
      trackBy: (a, b) => {
         return b.Name;
      },
      isTableLoading$: this.busy.asObservable(),
      // getRowState: (row: any, schemaKey: string): Observable<RowState> => {
      //   return observableOf({});
      // }
    };
  }

  private fetch() {
    this.busy.next(true);

    this.analysisServer.getReportFile(this.id, this.imageReport.details).subscribe(report => {

      // Report always has the report envelope - the clair report is in the .report
      if (report.report && report.report.Vulnerabilities) {
        const klar: Vulnerabilities = report.report.Vulnerabilities;

        const vulns: Vulnerability[] = [];
        this.totals = {};
        // Turn the map into a single list of vulnerabilities
        ClairSeverityOrder.forEach(severity => {
          if (klar[severity]) {
            vulns.push(...klar[severity]);
            this.totals[severity] = klar[severity].length;
          }
        });

        this.patches = 0;
        vulns.forEach(v => {
          if (v.FixedBy) {
            this.patches++;
          }
        });

        this.detail = vulns;
        this.data.next(vulns);
        this.total = vulns.length;
        this.busy.next(false);
      }

    });

  }

}
