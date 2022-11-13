data "aws_iam_policy_document" "assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["amplify.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "amplify_role" {
  name = "amplify_deploy_terraform_role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
#   assume_role_policy = <<POLICY
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "amplify.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole"
#     }
#   ]
# }
# POLICY
  assume_role_policy = join("", data.aws_iam_policy_document.assume_role.*.json)
  

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}


resource "aws_iam_role_policy" "amplify_role_policy" {
  name = "amplify_iam_role_policy"
  role = aws_iam_role.amplify_role.id

  policy = file("${path.cwd}/amplify/amplify_role_policies.json")
}


# resource "aws_amplify_app" "frontend" {
#   name = "${var.project_name}-${var.environment}"
#   repository = var.github_repository
#   access_token= var.github_token_for_frontend

#   build_spec = <<-EOT
#     version: 1
#     frontend:
#       phases:
#         preBuild:
#           commands:
#             - yarn install
#         build:
#           commands:
#             - yarn run build
#       artifacts:
#         baseDirectory: .next
#         files:
#           - '**/*'
#       cache:
#         paths:
#           - node_modules/**/*
#   EOT

#   enable_auto_branch_creation = true
#   enable_branch_auto_build = true
#   enable_branch_auto_deletion = true
#   platform = "WEB"

#   # auto_branch_creation_config {
#   #   enable_pull_request_preview = true
#   #   environment_variables = {
#   #     APP_ENVIRONMENT = "develop"
#   #   }
#   # }

#   iam_service_role_arn = aws_iam_role.amplify_role.arn

#   # Comment this on the first run, trigger a build of your branch,
# #    This will added automatically on the console after deployment. 
# # Add it here to ensure your subsequent terraform runs don't break your amplify deployment.

#   custom_rule {
#     source = "/<*>"
#     status = "200"
#     target = "https://d2aobmulfyn5jq.cloudfront.net/<*>"
#   }

#   custom_rule {
#     source = "/<*>"
#     status = "404-200"
#     target = "/index.html"  
#   }

#   tags = {
#     Environment = var.environment
#     Project     = var.project_name
#   }

#   environment_variables = {
#     APP_ENVIRONMENT = "develop"
#     COGNITO_CLIENT_ID= var.env_cognito_client_id
#     COGNITO_CLIENT_SECRET=var.env_cognito_client_secret
#     COGNITO_USER_POOL_ID=var.env_cognito_user_pool_id
#     NEXTAUTH_URL=var.env_nextauth_url
#     STRIPE_SECRET_KEY=var.env_stripe_secret_key
#     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=var.env_next_public_stripe_publishable_key
#     DYNAMO_DB_ENDPOINT=var.dynamo_db_endpoint
#   }
# }

# map git branches to amplify
#- - - - - - - - - - - - - - -- - - -- - - - - -- - - - - - -
# resource "aws_amplify_branch" "dev_from_master" {
#   app_id      = aws_amplify_app.frontend.id
#   branch_name = "master"

#   enable_auto_build = true

#   framework = "Next.js - SSR"
#   stage     = "DEVELOPMENT"

#   environment_variables = {
#     APP_ENVIRONMENT = "develop"
#     COGNITO_CLIENT_ID= var.env_cognito_client_id
#     COGNITO_CLIENT_SECRET=var.env_cognito_client_secret
#     COGNITO_USER_POOL_ID=var.env_cognito_user_pool_id
#     NEXTAUTH_URL=var.env_nextauth_url
#     STRIPE_SECRET_KEY=var.env_stripe_secret_key
#     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=var.env_next_public_stripe_publishable_key
#     DYNAMO_DB_ENDPOINT=var.dynamo_db_endpoint
#   }
# }

# resource "aws_amplify_domain_association" "develop" {
#   app_id      = aws_amplify_app.frontend.id
#   domain_name = "staging-xxx.xxx.co"

#   # https://staging-xxx.xxx.co
#   sub_domain {
#     branch_name = aws_amplify_branch.develop.branch_name
#     prefix      = ""
#   }

#   # https://www.staging-xxx.xxx.co
#   sub_domain {
#     branch_name = aws_amplify_branch.develop.branch_name
#     prefix      = "www"
#   }
# }