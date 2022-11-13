locals {
  service_name_prefix = "tcc-api-gateway-${var.environment}"
}

resource "aws_api_gateway_rest_api" "tcc_api" {
  api_key_source = "HEADER"
  endpoint_configuration {
    types = ["REGIONAL"]
  }

  name = "tcc_api"
  description = "The publicly exposed API for the TCC"
}

module "event_route" {
  source = "./modules/route"
  prefix = local.service_name_prefix
  path_part = "event"
  tcc_api_id = aws_api_gateway_rest_api.tcc_api.id
  root_resource_id = aws_api_gateway_rest_api.tcc_api.root_resource_id
  # api_service_url = var.api_service_url
  integration_uri = var.integration_uri
}


resource "aws_api_gateway_deployment" "tcc_api" {
  rest_api_id = aws_api_gateway_rest_api.tcc_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      module.event_route.route_resource_id,
      module.event_route.route_method_id,
      module.event_route.route_integration_id
    ]))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "tcc_api" {
  depends_on = [aws_cloudwatch_log_group.tcc_api]

  deployment_id = aws_api_gateway_deployment.tcc_api.id
  rest_api_id   = aws_api_gateway_rest_api.tcc_api.id
  stage_name = var.stage_name
  
  }
  

resource "aws_api_gateway_method_settings" "tcc_api" {
  rest_api_id = aws_api_gateway_rest_api.tcc_api.id
  stage_name  = aws_api_gateway_stage.tcc_api.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled = true
    # logging_level   = "INFO"
    data_trace_enabled = true
  }
}

resource "aws_cloudwatch_log_group" "tcc_api" {
  name              = "API-Gateway-Access-Logs_${aws_api_gateway_rest_api.tcc_api.id}/${var.stage_name}"
  retention_in_days = "1"
}

resource "aws_lambda_permission" "apigw" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name  = var.lambda_name
   principal     = "apigateway.amazonaws.com"

   # The "/*/*" portion grants access from any method on any resource
   # within the API Gateway REST API.
   source_arn = "${aws_api_gateway_rest_api.tcc_api.execution_arn}/*/*"
}

# resource "aws_api_gateway_domain_name" "tcc_api" {
#   domain_name              = var.custom_domain_name
#   regional_certificate_arn = var.custom_domain_cert_arn

#   endpoint_configuration {
#     types = ["REGIONAL"]
#   }
# }

# resource "aws_route53_record" "tcc_api" {
#   depends_on = [aws_api_gateway_domain_name.tcc_api]

#   name    = aws_api_gateway_domain_name.tcc_api.domain_name
#   type    = "A"
#   zone_id = var.route53_zone_id

#   alias {
#     evaluate_target_health = true
#     name                   = aws_api_gateway_domain_name.tcc_api.regional_domain_name
#     zone_id                = aws_api_gateway_domain_name.tcc_api.regional_zone_id
#   }
# }

# resource "aws_api_gateway_base_path_mapping" "example" {
#   depends_on = [aws_api_gateway_rest_api.tcc_api, aws_api_gateway_domain_name.tcc_api]
#   api_id      = aws_api_gateway_rest_api.tcc_api.id
#   stage_name  = aws_api_gateway_stage.tcc_api.stage_name
#   domain_name = aws_api_gateway_domain_name.tcc_api.domain_name
# }
