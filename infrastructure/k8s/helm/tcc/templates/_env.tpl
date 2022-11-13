{{ define "env.earlbot" }}
- name: SOME_VAR
  value: "{{ .Values.earlbot.env.someVar }}"
- name: BOT_TOKEN
  valueFrom:
    secretKeyRef:
      name: {{ .Values.earlbot.name}}-secrets
      key: bot_token
      optional: false
{{ end }}

{{ define "env.webportal" }}
- name: AUTH0_BASE_URL
  value: {{ .Values.webportal.env.auth0BaseUrl }}
- name: AUTH0_ISSUER_BASE_URL
  value: {{ .Values.webportal.env.auth0IssuerBaseUrl }}
- name: AUTH0_CLIENT_ID
  value: {{ .Values.webportal.env.auth0ClientId }}
- name: AUTH0_CLIENT_SECRET
  valueFrom:
    secretKeyRef:
      name: {{ .Values.webportal.name}}-secrets
      key: AUTH0_CLIENT_SECRET
      optional: false
- name: AUTH0_SECRET
  valueFrom:
    secretKeyRef:
      name: {{ .Values.webportal.name}}-secrets
      key: AUTH0_SECRET
      optional: false
- name: MONGODB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {{ .Values.webportal.name}}-secrets
      key: MONGODB_PASSWORD
      optional: false
- name: MONGODB_USERNAME
  value: {{ .Values.webportal.env.mongodbUsername }}
- name: MONGODB_URI 
  value: {{ .Values.webportal.env.mongodbUri}}
- name: MONGODB_DB
  value: {{ .Values.webportal.env.mongodbDb }}
{{ end }}