import { Observable } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KubernetesAnalysisService } from '../../services/kubernetes.analysis.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-analysis-report-selector',
  templateUrl: './analysis-report-selector.component.html',
  styleUrls: ['./analysis-report-selector.component.scss']
})
export class AnalysisReportSelectorComponent implements OnInit {

  public selection = { title: 'None' };

  public analyzers$: Observable<any>;

  @Input() endpoint;
  @Input() path;
  @Input() prompt = 'Overlay Analysis';
  @Input() allowNone = true;
  @Input() autoSelect;

  @Output() selected = new EventEmitter<any>();
  @Output() reportCount = new EventEmitter<boolean>();

  autoSelected = false;

  constructor(public analysisService: KubernetesAnalysisService) { }

  ngOnInit() {
    this.analyzers$ = this.analysisService.getByPath(this.endpoint, this.path).pipe(
      map(d => {
        const res = [];
        if (this.allowNone) {
          res.push({title: 'None'});
        }
        d.forEach(r => {
          const c = {... r};
          const title = c.type.substr(0, 1).toUpperCase() + c.type.substr(1);
          const age = moment(c.created).fromNow(true);
          c.title = `${title} (${age})`;
          res.push(c);
        });
        this.reportCount.next(d.length);
        // Auto-select first report
        if (!this.autoSelected && this.autoSelect && res.length > 0) {
          this.onSelected(res[0]);
        }
        return res;
      })
    );
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

}
