variable "environment" {
  type = string
}
variable "name" {
    type = string
}
variable "description" {
    type = string
}
variable "domain" {
    type = string
}
variable "callbacks" {
    type = list(string)
}
variable "allowed_logout_urls" {
    type = list(string)
}