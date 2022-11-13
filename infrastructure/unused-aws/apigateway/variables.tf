variable "environment" {
  default = ""
  type = string
}
variable "stage_name" {
  default = ""
  type = string
}
# variable "route53_zone_id" {
#   default = ""
#   type = string
#   description = "Zone ID for the Route53 records for the custom domain"
# }
# variable "custom_domain_cert_arn" {
#   default = ""
#   type = string
#   description = "ARN of the certificate used for signing custom domain"
# }
# variable "custom_domain_name" {
#   default = ""
#   type = string
#   description = "Custom domain name to sit in front of API gateway"
# }
variable "integration_uri" {
  type = string
}
variable "lambda_name" {
  type = string
}
