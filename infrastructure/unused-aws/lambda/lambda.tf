resource "aws_iam_role" "lambda_role" {
name   = "${var.name}-role"
assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "lambda.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_policy" "iam_policy_for_lambda" {
 
 name         = "aws_iam_policy_for_terraform_aws_lambda_role_for_lambda_${var.name}"
 path         = "/"
 description  = "AWS IAM Policy for managing aws lambda role for ${var.name}"
 policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": [
       "logs:CreateLogGroup",
       "logs:CreateLogStream",
       "logs:PutLogEvents"
     ],
     "Resource": "arn:aws:logs:*:*:*",
     "Effect": "Allow"
   }
 ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
 role        = aws_iam_role.lambda_role.name
 policy_arn  = aws_iam_policy.iam_policy_for_lambda.arn
}

# use  `lambda-build -e src/index.ts` instead. then point at archive.zip
# data "archive_file" "zip_the_node_code" {
#     type        = "zip"
#     source_dir  = var.source_dir
#     output_path = var.output_path
# }

resource "aws_s3_bucket" "bucket" {
  bucket = "lambda-zip-bucket-tcc-${var.name}"
}

resource "aws_s3_bucket_acl" "example" {
  bucket = aws_s3_bucket.bucket.id
  acl    = "private"
}

resource "aws_s3_object" "lambda_s3_object" {
  bucket = aws_s3_bucket.bucket.id

  key    = "archive.zip"
  # source = data.archive_file.zip_the_node_code.output_path
  source = var.output_path

  # etag = filemd5(data.archive_file.zip_the_node_code.output_path)
  etag  = filemd5(var.output_path)
}

resource "aws_lambda_function" "lambda" {
    # filename                       = var.output_path

    s3_bucket = aws_s3_bucket.bucket.id
    s3_key    = aws_s3_object.lambda_s3_object.key
    function_name                  = var.function_name
    role                           = aws_iam_role.lambda_role.arn
    handler                        = var.handler
    runtime                        = var.runtime
    depends_on                     = [aws_iam_role_policy_attachment.attach_iam_policy_to_iam_role]
    # source_code_hash               = "${data.archive_file.zip_the_node_code.output_base64sha256}"
    # source_code_hash =            =  base64sha256(var.output_path)
    source_code_hash = filebase64sha256(var.output_path)

    environment {
        variables = var.environment_variables
  }
}

output "lambda_invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
}
output "function_name" {
  value = aws_lambda_function.lambda.function_name
}

