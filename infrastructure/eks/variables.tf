variable "region" {
  default = ""
  type    = string
}

variable "skip_credentials_validation" {
  default = false
  type = bool
}

variable "skip_metadata_api_check" {
  default = false
  type = bool
}

variable "skip_requesting_account_id" {
  default = false
  type = bool
}

variable "dynamo_endpoint" {
  default = ""
  type = string
}

variable "role_arn" {
  type = string
}

variable "environment" {
  type = string
}