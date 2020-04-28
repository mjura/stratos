{{/* vim: set filetype=mustache: */}}

{{/*
Determine external IPs:
This will do the following:
1. Check for Legacy SCF Config format
2. Check for Metrics specific External IP
3. Check for New SCF Config format
4. Check for new Metrics External IPS
*/}}
{{- define "service.externalIPs" -}}
{{- if .Values.clair.externalIP }}
  externalIPs:
{{- printf "\n - %s" .Values.clair.externalIP | indent 3 -}}
{{- printf "\n" -}}
{{- else if .Values.clair.service -}}
{{- if .Values.clair.service.externalIPs }}
  externalIPs:
{{- range .Values.clair.service.externalIPs -}}
{{ printf "\n- %s" . | indent 4 }}
{{- end -}}
{{- printf "\n" -}}
{{- end -}}
{{ end }}
{{ end }}

{{/*
Image pull secret
*/}}
{{- define "imagePullSecret" }}
{{- printf "{\"%s\":{\"username\": \"%s\",\"password\":\"%s\",\"email\":\"%s\",\"auth\": \"%s\"}}" .Values.kube.registry.hostname .Values.kube.registry.username .Values.kube.registry.password .Values.kube.registry.email (printf "%s:%s" .Values.kube.registry.username .Values.kube.registry.password | b64enc) | b64enc }}
{{- end }}

{{/*
Service type:
*/}}
{{- define "service.serviceType" -}}
{{- if .Values.clair.service -}}
{{- default "ClusterIP" .Values.clair.service.type -}}
{{- else -}}
ClusterIP
{{- end -}}
{{- end -}}

{{/*
Service port:
*/}}
{{- define "service.servicePort" -}}
{{- if .Values.clair.service -}}
{{ default 6060 .Values.clair.service.servicePort}}
{{- else -}}
6060
{{- end -}}
{{- end -}}

{{/*
Expand the name of the chart.
*/}}
{{- define "metrics.certName" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Generate self-signed certificate for ingress if needed
*/}}
{{- define "metrics.generateIngressCertificate" -}}
{{- $altNames := list (printf "%s" .Values.clair.service.ingress.host) (printf "%s.%s" (include "metrics.certName" .) .Release.Namespace ) ( printf "%s.%s.svc" (include "metrics.certName" .) .Release.Namespace ) -}}
{{- $ca := genCA "stratos-ca" 365 -}}
{{- $cert := genSignedCert ( include "metrics.certName" . ) nil $altNames 365 $ca -}}
{{- if .Values.clair.service.ingress.tls.crt }}
  tls.crt: {{ .Values.clair.service.ingress.tls.crt | b64enc | quote }}
{{- else }}
  tls.crt: {{ $cert.Cert | b64enc | quote }}
{{- end -}}
{{- if .Values.clair.service.ingress.tls.key }}
  tls.key: {{ .Values.clair.service.ingress.tls.key | b64enc | quote }}
{{- else }}
  tls.key: {{ $cert.Key | b64enc | quote }}
{{- end -}}
{{- end -}}

{{/*
Ingress Host from .Values.clair.service
*/}}
{{- define "ingress.host.value" -}}
{{- if .Values.clair.service -}}
{{- if .Values.clair.service.ingress -}}
{{- if .Values.clair.service.ingress.host -}}
{{ .Values.clair.service.ingress.host }}
{{- end -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Ingress Host:
*/}}
{{- define "ingress.host" -}}
{{ $host := (include "ingress.host.value" .) }}
{{- if $host -}}
{{ $host | quote }}
{{- else if .Values.env.DOMAIN -}}
{{ print "metrics." .Values.env.DOMAIN }}
{{- else -}}
{{ required "Host name is required" $host | quote }}
{{- end -}}
{{- end -}}
