export const ClairSeverityOrder = [ 'Critical', 'High', 'Medium', 'Low', 'Negligible', 'Unknown' ];

export interface KlarReport {
  LayerCount: number;
  Vulnerabiltiies: Vulnerabilities;
}

export interface Vulnerabilities {
  Critiical: Vulnerability[];
  High: Vulnerability[];
  Low: Vulnerability[];
  Medium: Vulnerability[];
  Negligable: Vulnerability[];
  Unknown: Vulnerability[];
}

export interface Vulnerability {
  Description: string;
  FeatureName: string;
  FeatureVersion: string;
  FixedBy: string;
  Link: string;
  Metadata?: any;
  Name: string;
  NamespaceName: string;
  Severity: string;
}
