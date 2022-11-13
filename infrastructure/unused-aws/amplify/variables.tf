variable "environment" {
  default = ""
  type    = string
}

variable "project_name" {
  type = string
}

variable "github_repository" {
  type = string
}

variable "github_token_for_frontend" {
  sensitive = true
  type = string
}


variable "env_cognito_client_id"{
  sensitive = true
  type = string
}

variable "env_cognito_client_secret" {
  sensitive = true
  type = string
}

variable "env_cognito_user_pool_id" {
  type = string
}

variable "env_nextauth_url" {
  type = string
}

variable "env_backend_base_url" {
  type = string
}

variable "env_stripe_secret_key" {
  sensitive = true
  type = string
}

variable "env_next_public_stripe_publishable_key" {
  sensitive = true
  type = string
}

variable "dynamo_db_endpoint" {
  type = string
}