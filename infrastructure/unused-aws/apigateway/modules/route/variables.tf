variable "path_part" {
  type = string
}
variable "tcc_api_id" {
  type = string
}
variable "root_resource_id" {
  type = string
}
variable "http_method" {
  type = string
  default = "ANY"
}
variable "api_service_url" {
  default = ""
  type = string
}
variable "prefix" {
  type = string
}
variable "integration_uri" {
  type = string
}