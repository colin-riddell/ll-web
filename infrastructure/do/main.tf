

terraform {
  

 required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
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

# To use this, export the DIGITALOCEAN_ACCESS_TOKEN first
provider "digitalocean" {
}

# apply this then use: doctl kubernetes cluster kubeconfig save $(terraform output -raw k8s-cluster-id)
resource "digitalocean_kubernetes_cluster" "cluster" {
  name   = "${var.environment}-k8s-cluster"
  region = "lon1"
  version = "1.24.4-do.0"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb"
    node_count = 2

  }
}

output "k8s-kubeconfig" {
  value = digitalocean_kubernetes_cluster.cluster.kube_config
  sensitive = true
}
output "k8s-endpoint" {
  value = digitalocean_kubernetes_cluster.cluster.kube_config
  sensitive = true
}
output "k8s-cluster-id" {
  value = digitalocean_kubernetes_cluster.cluster.id
}

# note - use : doctl registry login 
resource "digitalocean_container_registry" "tcc-registry" {
  name                   = "tcc-registry"
  subscription_tier_slug = "basic"
  region = "ams3"
}

output "registry-server-url" {
  value = digitalocean_container_registry.tcc-registry.server_url
}

# resource "digitalocean_database_cluster" "mongodb-dev" {
#   name       = "mongodb-dev"
#   engine     = "mongodb"
#   version    = "5"
#   size       = "db-s-1vcpu-1gb"
#   region     = "lon1"
#   node_count = 1
# }

# output "mongodb-dev-uri" {
#   value = nonsensitive(digitalocean_database_cluster.mongodb-dev.uri)
# }

# output "mongodb-dev-private-uri" {
#   value = nonsensitive(digitalocean_database_cluster.mongodb-dev.private_uri)
# }

# output "mongodb-dev-private-username" {
#   value = digitalocean_database_cluster.mongodb-dev.user
# }
# output "mongodb-dev-private-password" {
#   value = nonsensitive(digitalocean_database_cluster.mongodb-dev.password)
# }


# prod 
resource "digitalocean_database_cluster" "mongodb-prod" {
  name       = "mongodb-prod"
  engine     = "mongodb"
  version    = "5"
  size       = "db-s-1vcpu-1gb"
  region     = "lon1"
  node_count = 1
}

output "mongodb-prod-uri" {
  value = nonsensitive(digitalocean_database_cluster.mongodb-prod.uri)
}

output "mongodb-prod-private-uri" {
  value = nonsensitive(digitalocean_database_cluster.mongodb-prod.private_uri)
}

output "mongodb-prod-private-username" {
  value = digitalocean_database_cluster.mongodb-prod.user
}
output "mongodb-prod-private-password" {
  value = nonsensitive(digitalocean_database_cluster.mongodb-prod.password)
}