import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  constructor() { }

  @Input("icon")
  icon: string;

  ngOnInit() {
    if (this.icon.indexOf('svg:') === 0) {
      this.icon = this.icon.substr(4);
      console.log(this.icon);
    }
  }
}
