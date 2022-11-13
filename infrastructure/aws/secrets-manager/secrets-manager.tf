# Firstly create a random generated password to use in secrets.
 
# resource "random_password" "password" {
#   length           = 16
#   special          = true
#   override_special = "_%@"
# }
 
# Creating a AWS secret 
resource "aws_secretsmanager_secret" "this" {
   name = var.secret-key
}
 
# Creating a AWS secret version
resource "aws_secretsmanager_secret_version" "this" {
  secret_id = aws_secretsmanager_secret.this.id
  secret_string ="original-secret"
}
 
# Importing the AWS secrets created previously using arn.
data "aws_secretsmanager_secret" "this" {
  arn = aws_secretsmanager_secret.this.arn
}
 
# Importing the AWS secret version created previously using arn.
data "aws_secretsmanager_secret_version" "this" {
  secret_id = data.aws_secretsmanager_secret.this.id
}
 
# After importing the secrets storing into Locals
 
locals {
#   db_creds = jsondecode(data.aws_secretsmanager_secret_version.this.secret_string)
    secret = data.aws_secretsmanager_secret_version.this.secret_string
}