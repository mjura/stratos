import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsComponent } from './metrics/metrics.component';
import { MetricsRoutingModule } from './metrics.routing';

@NgModule({
  imports: [
    CommonModule,
    MetricsRoutingModule,
  ],
  declarations: [MetricsComponent],
})
export class MetricsModule { }
