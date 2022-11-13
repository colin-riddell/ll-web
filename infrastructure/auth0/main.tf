# To use this tf
#  export DIGITALOCEAN_ACCESS_TOKEN= token here
#  export AWS_PROFILE=digitalocean
# export AUTH0_DOMAIN=thecodercareer.eu.auth0.com \                                                                                            🚧: auth0-prod
# export AUTH0_CLIENT_ID=I5hewtQA9KoRTgzNKqd8FiOmxJqgqvOl \
# export AUTH0_CLIENT_SECRET=Piu-pp5YHR8IcDfAa6ZwUhNuoedzhHkHjOjzMCW5iDvWxm8SmupGVoA6I9lbpEBe

terraform {
  

 required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 0.34.0"
    }
  }

  # set export AWS_PROFILE=digitalocean  first
  backend "s3" {
    endpoint = "https://fra1.digitaloceanspaces.com/"
    region = "eu-west-2" 
    key = "terraform.tfstate"
    bucket = "tcc-tfstates"
    skip_credentials_validation = true
    skip_metadata_api_check = true
  }
}

provider "auth0" {}


resource "auth0_client" "my_client" {
  name            = "${var.environment}-${var.name}"
  description     = var.description
  app_type        = "regular_web"
  callbacks       = var.callbacks
  allowed_logout_urls = var.allowed_logout_urls
  oidc_conformant = true

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_rule" "role-on-first-login" {
  name = "role-on-first-login-${var.environment}"
  script = templatefile("${path.module}/rules/role-on-first-login.js",{
    NAMESPACE : "http://thecodercareer.com"
  })
  enabled = true
}

output "client_id" {
    value = auth0_client.my_client.client_id
}
output "client_secret" {
    value =  nonsensitive(auth0_client.my_client.client_secret)
}


resource "auth0_connection" "auth0-db-connection" {
  name                 = "${var.environment}-auth0-db-connection"
  is_domain_connection = false
  strategy             = "auth0"
  enabled_clients = [ auth0_client.my_client.id ]  
}

resource "auth0_connection" "google_oauth2" {
  name     = "${var.environment}-google-oauth2-connection"
  strategy = "google-oauth2"
  enabled_clients = [ auth0_client.my_client.id ]  


  options {
    client_id                = "487473238367-k60l59kgq28jdoi97m2cmsi6und6vkpj.apps.googleusercontent.com"
    client_secret            = "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"
    allowed_audiences        = [var.domain, "dev.caol.io"]
    scopes                   = ["email", "profile", "gmail", "youtube"]
    set_user_root_attributes = "on_each_login"
  }
}

