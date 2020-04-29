import { Component, OnInit } from '@angular/core';

import { IReportViewer } from '../analysis-report-viewer.component';
import {
  ClairSeverityOrder,
} from './../../../../../../../../../custom-src/frontend/app/custom/kubernetes/analysis-report-viewer/clair-report-viewer/clair-report.types';

interface ImageInfo {
  name: string;
  tag: string;
  image: string;
  registry: string;
  info: ImageInfoDetail;
  highestSeverity: string;
  total: number;
}

interface ImageInfoDetail {
  LayerCount: number;
  Vulnerabilities: {string: number};
}

@Component({
  selector: 'app-clair-report-viewer',
  templateUrl: './clair-report-viewer.component.html',
  styleUrls: ['./clair-report-viewer.component.scss']
})
export class ClairReportViewerComponent implements OnInit, IReportViewer {

  report: any;

  selected: string;

  detail: any;

  images: ImageInfo[];

  constructor() { }

  ngOnInit() {
    this.images = [];
    if (this.report && this.report.report && this.report.report.images) {
      this.report.report.images.forEach(img => {
        const imageAndTag = img.name.split(':');
        const image = {
          name: img.name,
          tag: imageAndTag[1],
          image: imageAndTag[0],
          registry: '',
          info: img,
          highestSeverity: this.getHighestSeverity(img),
          total: this.getTotal(img)
        };
        this.parseImageName(image);
        this.images.push(image);
      });
    }

    // Sort the images based on severity
    this.images = this.images.sort(this.sortBySeverityComparer);

    // Auto-select first one
    if (this.images.length > 0) {
      this.selectImage(this.images[0].name);
    }
  }

  private parseImageName(image: ImageInfo) {
    const parts = image.image.split('/');

    image.image = parts.pop();
    image.registry = parts.join('/');
  }

  selectImage(name: string) {
    this.selected = name;
    const img = this.images.find(item => item.name === name);
    if (img) {
      this.detail = img.info;
    }
  }

  // Compartor for sorting by severity
  private sortBySeverityComparer(a: ImageInfo, b: ImageInfo): number {

    // Go through the severities in order
    for (const severity of ClairSeverityOrder) {
      const sa = getSeverity(a, severity);
      const sb = getSeverity(b, severity);
      if (sa !== sb) {
        return sb - sa;
      }
    }
    // Must be the same
    return 0;
  }

  private getTotal(info: ImageInfoDetail): number {
    let total = 0;
    for (const severity of ClairSeverityOrder) {
      const count = info.Vulnerabilities[severity] ? info.Vulnerabilities[severity] : 0;
      total += count;
    }

    return total;
  }

  private getHighestSeverity(info: ImageInfoDetail): string {
    for (const severity of ClairSeverityOrder) {
      const count = info.Vulnerabilities[severity] ? info.Vulnerabilities[severity] : 0;
      if (count > 0) {
        return severity.toLowerCase();
      }
    }

    // There are no vulnerabilities
    return 'ok';
  }
}

function getSeverity(img: ImageInfo, severity: string): number {
  if (!img.info || !img.info.Vulnerabilities) {
    return 0;
  }
  return  img.info.Vulnerabilities[severity] ? img.info.Vulnerabilities[severity] : 0;
}
