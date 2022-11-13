variable "region" {
  default = ""
  type    = string
}

# variable "access_key" {
#   sensitive = true
#   type = string
# }

# variable "secret_key" {
#   sensitive = true
#   type = string
# }

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
# variable "discord_pub_key" {
#   sensitive = true
#   type = string
# }
# variable "discord_bot_token" {
#   sensitive = true
#   type = string
# }
