import { Component, OnInit } from '@angular/core';
import { CloudFoundryEndpointService } from '../../services/cloud-foundry-endpoint.service';
import { Http, Headers } from '@angular/http';
import { BaseCF } from '../../cf-page.types';
import { UtilsService } from '../../../../core/utils.service';

@Component({
  selector: 'app-cloud-foundry-summary-tab',
  templateUrl: './cloud-foundry-summary-tab.component.html',
  styleUrls: ['./cloud-foundry-summary-tab.component.scss']
})
export class CloudFoundrySummaryTabComponent implements OnInit {

  yAxisTickFormatting;

  constructor(
    private cfEndpointService: CloudFoundryEndpointService,
    private http: Http,
    private cfGuid: BaseCF,
    private utils: UtilsService,
  ) {

    this.yAxisTickFormatting = (value) => {
      return this.utils.mbToHumanSize(value/1024/1024);
    }
  }

  metricsData = [];
  range = '3w';


  ngOnInit() {

      const MAX_DATA_POINTS_PER_SERIES = 1000;

     console.log('TESTING METRICS.....');

      console.log(this.cfGuid.guid);
      const headers = new Headers({ 'x-cap-cnsi-list': this.cfGuid.guid });
      const requestArgs = {
        headers: headers
      };

      const url = '/pp/v1/metrics/cf/query?query=firehose_value_metric_cc_vitals_mem_used_bytes{}[' + this.range + ']';
      const cfMetrics = this.http.get(url, requestArgs).map(response => {

        const data = response.json();
        const metrics = data[this.cfGuid.guid];
        console.log(metrics);
        // Convert each series to chart data
        //metrics.results.

        this.metricsData = [];

        const dat = metrics.data.result;

        dat.forEach(series => {
          const s = {};
          s.name = series.metric.bosh_job_ip;

          console.log('length: ' + series.values.length);
          //s.series = series.values.map(item => { return  } );

          s.series = [];
          let skip  = 1;
          if (series.values.length > MAX_DATA_POINTS_PER_SERIES) {
            skip = series.values.length / MAX_DATA_POINTS_PER_SERIES;
            skip = Math.floor(skip);
            console.log(skip);
          }

          for(var i = 0; i < series.values.length; i+= skip) {
            const dataPoint = series.values[i];
            s.series.push({ name: dataPoint[0], value: parseInt(dataPoint[1]) });
          }

          console.log(s);
          this.metricsData.push(s);
        });
      }).subscribe();
  }
}
