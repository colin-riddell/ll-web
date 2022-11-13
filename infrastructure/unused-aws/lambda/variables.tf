variable "name" {
  default = ""
  type = string
}
variable "source_dir" {
  default = ""
  type = string
}
variable "output_path" {
  default = ""
  type = string
}
variable "function_name" {
  default = ""
  type = string
}
variable "handler" {
  default = ""
  type = string
}
variable "runtime" {
  default = ""
  type = string
}
variable "environment_variables" {
  default = {}
  type = map
}