import { Observable, Subject } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KubernetesAnalysisService } from '../../services/kubernetes.analysis.service';
import { map, first } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-analysis-report-selector',
  templateUrl: './analysis-report-selector.component.html',
  styleUrls: ['./analysis-report-selector.component.scss']
})
export class AnalysisReportSelectorComponent implements OnInit {

  public selection = { title: 'None' };

  public analyzers$ = new Subject<any>();

  @Input() endpoint;
  @Input() path;
  @Input() prompt = 'Overlay Analysis';
  @Input() allowNone = true;
  @Input() autoSelect;

  @Output() selected = new EventEmitter<any>();
  @Output() reportCount = new EventEmitter<number>();

  autoSelected = false;

  constructor(public analysisService: KubernetesAnalysisService) { }

  ngOnInit() {
    this.analyzers$.pipe(first()).subscribe(reports => {
      // Auto-select first report
      if (!this.autoSelected && this.autoSelect && reports.length > 0) {
        this.onSelected(reports[0]);
      }
    });

    this.fetchReports();
  }

  private fetchReports() {
    this.analysisService.getByPath(this.endpoint, this.path).pipe(
      map(d => {
        const res = [];
        if (this.allowNone) {
          res.push({title: 'None'});
        }
        if (d) {
          d.forEach(r => {
            const c = {... r};
            const title = c.type.substr(0, 1).toUpperCase() + c.type.substr(1);
            const age = moment(c.created).fromNow(true);
            c.title = `${title} (${age})`;
            res.push(c);
          });
        }
        this.reportCount.next(res.length);
        return res;
      })
    ).subscribe(data => {
      this.analyzers$.next(data);
    });
  }

  // Selection changed
  public onSelected(d) {
    this.selection = d;
    if (!d.id) {
      this.selected.emit(null);
    } else {
      this.selected.next(d);
    }
  }

  public refreshReports($event: MouseEvent) {
    this.analysisService.refresh();
    this.fetchReports();
    $event.preventDefault();
    $event.cancelBubble = true;
  }

}
