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


resource "aws_dynamodb_table" "register_interest_table" {
  name           = "Interest"
  billing_mode   = "PAY_PER_REQUEST"

  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "customers_dynamo_table" {
  name           = "Customers"
  billing_mode   = "PAY_PER_REQUEST"

  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "jobs_dynamo_table" {
  name           = "Jobs"
  billing_mode   = "PAY_PER_REQUEST"

  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "CustomerId"
    type = "S"
  }

  global_secondary_index {
    name               = "CustomerIdIndex"
    hash_key           = "CustomerId"
    projection_type    = "ALL"
  }
}

# # will need to populate manually in console for the env
# module "bot-token-secret" {
#   source = "./secrets-manager"
#   secret-key = "bot-token"
# }

# resource "aws_ecr_repository" "aws-ecr" {
#   name = "earl-bot"
#   tags = {
#     Name        = "earl-bot"
#     Environment = var.environment
#   }
# }

# locals {
#   platform_name = "tcc"
# }

# locals {
#   # production_availability_zones = ["${var.region}a", "${var.region}b", "${var.region}c"]
#     production_availability_zones = ["${var.region}a", "${var.region}b"]
# }

# # used for connecting in ecs cluster. sets up vpc, ecr, alb, nat gateway, subnets, route tables and security groups
# # see x-aws-loadbalancer: arn:aws:elasticloadbalancing:eu-west-2:741309827656:loadbalancer/app/tcc-alb/595f2c617c52cf33
# # in the docker-compose.yaml of earl-bot
# module "vpc_lb" {
#   source = "./vpc_lb"
#   region               = var.region
#   environment          = var.environment
#   vpc_cidr             = "10.0.0.0/16"
#   public_subnets_cidr  = ["10.0.1.0/24", "10.0.0.0/24"]
#   private_subnets_cidr = ["10.0.10.0/24", "10.0.11.0/24"]
#   availability_zones   = local.production_availability_zones
# }

# # API Gateway and VPC link
# module api_gateway {
#   source = "./api-gateway"
#   name = "${var.platform_name}-${var.environment}"
#   integration_input_type = "HTTP_PROXY"
#   path_part = "{proxy+}"
#   app_port = var.app_port
#   nlb_dns_name = module.ecs_task_definition_and_service.nlb_dns_name
#   nlb_arn = module.ecs_task_definition_and_service.nlb_arn
#   environment = var.environment
# }