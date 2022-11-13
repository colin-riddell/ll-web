
# module "bot-lambda2" {
#     source = "./lambda"
#     name   = "bot-lambda"
#     source_dir = "${path.module}/../../earl-bot/"
#     output_path = "${path.module}/../../earl-bot/archive.zip"
#     function_name = "EarlBotFunction"
#     handler =  "index.handler"
#     runtime = "nodejs16.x"
#     environment_variables = { 
#       PUBLIC_KEY = var.discord_pub_key,
#       BOT_TOKEN  = var.discord_bot_token
#       APP_ID     = "1016698223353663620"
#     }
# }

# module "apigateway" {
#   source = "./apigateway"
#   environment = var.environment
#   stage_name = var.environment
#   # custom_domain_cert_arn = var.custom_domain_cert_arn
#   # custom_domain_name = var.custom_domain_name
#   # route53_zone_id = var.route53_zone_id
#   integration_uri = module.bot-lambda2.lambda_invoke_arn
#   lambda_name     = module.bot-lambda2.function_name
# }

# module "ecs-cluster" {
#   source = "./ecs"
#   environment = var.environment
#   app_name = "tcc-backend-ecs"
#   aws_region        = var.region
#   availability_zones = ["eu-west-2"]
#   public_subnets     = ["10.10.100.0/24", "10.10.101.0/24"]
#   private_subnets    = ["10.10.0.0/24", "10.10.1.0/24"]
# }



# module "ecs-cluster" {
#   source = "./ecs-cluster"
#   region = var.region
#   platform_name = "tcc-ecs-backend-infra"
#   environment = var.environment
#   app_port = 8080
#   # app_image = "earl-bot:latest"
#   # app_image = "earl-bot"
#   app_count = 2
#   availability_zones = ["eu-west-2a", "eu-west-2b"]
#   bot_token = var.discord_bot_token

# }