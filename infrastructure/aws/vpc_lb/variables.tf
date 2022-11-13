variable "region" {
  type = string
}

variable "environment" {
  type = string
  description = "Deployment Environment"
}

variable "availability_zones" {
  type        = list
  description = "AZ in which all the resources will be deployed"
}

variable "vpc_cidr" {
  description = "CIDR block of the vpc"
}

variable "public_subnets_cidr" {
  type        = list(any)
  description = "CIDR block for Public Subnet"
}

variable "private_subnets_cidr" {
  type        = list(any)
  description = "CIDR block for Private Subnet"
}