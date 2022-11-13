provider "aws" {
  region                      = var.region
  skip_credentials_validation = var.skip_credentials_validation
  skip_metadata_api_check     = var.skip_metadata_api_check
  skip_requesting_account_id  = var.skip_requesting_account_id
  profile = "default" # the default account should be allowed to assume env roles

  endpoints {
    dynamodb = var.dynamo_endpoint
  }

  assume_role {
    role_arn    = var.role_arn
    external_id = "my_external_id"
  }
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend  "s3" {
    bucket = "tcc-tfstate-8adawjd0awd8mm"
    key = "terraform/terraform.tfstate"
    region = "eu-west-2"
  }
}


provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
}

data "aws_availability_zones" "available" {}

locals {
  cluster_name = "tcc-eks-${var.environment}"
}