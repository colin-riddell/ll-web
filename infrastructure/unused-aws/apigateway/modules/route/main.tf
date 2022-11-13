resource "aws_api_gateway_resource" "api_resource_this" {
  rest_api_id = var.tcc_api_id
  parent_id   = var.root_resource_id
  path_part   = var.path_part
}
resource "aws_api_gateway_method" "get_method" {
  rest_api_id   = var.tcc_api_id
  resource_id   = aws_api_gateway_resource.api_resource_this.id
  http_method   = var.http_method
  authorization = "NONE"
  # api_key_required = true
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id = var.tcc_api_id
  resource_id = aws_api_gateway_resource.api_resource_this.id
  http_method = aws_api_gateway_method.get_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  # connection_type         = "AWS_PROXY"
  # uri                     = "${var.api_service_url}/${var.path_part}"
  # uri                     = aws_lambda_function.lambda.invoke_arn
  uri                     = var.integration_uri
}

# resource "aws_api_gateway_method_response" "response_200" {
#   rest_api_id = var.tcc_api_id
#   resource_id = aws_api_gateway_resource.api_resource_this.id
#   http_method = aws_api_gateway_method.get_method.http_method
#   status_code = "200"
# }

# resource "aws_api_gateway_integration_response" "integration_response" {
#   rest_api_id = var.tcc_api_id
#   resource_id = aws_api_gateway_resource.api_resource_this.id
#   http_method = aws_api_gateway_method.get_method.http_method
#   status_code = aws_api_gateway_method_response.response_200.status_code
# }
