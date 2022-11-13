# k8s with DO

## Running

### Updating

`helm upgrade  tcc-dev tcc --values ./values/development.yaml --namespace dev`


## Nginx controller stuff

The nginx controller is weird in that in order to have two, then two classes need to be installed. To do that 
install controllers for each env with something like:
`helm install ingress-dev ingress-nginx/ingress-nginx --namespace dev --set controller.ingressClassResource.name=dev-class --set controller.scope.namespace=dev --set controller.ingressClassByName=true`

Then once it's running can delete that manually in k9s, and the LB in DO will be removed without issue.
eg: `helm uninstall ingress-prod -n prod` or `helm uninstall tcc-dev -n dev`





## Setup 



* `cd infrastructure/do`
* `terraform apply -var-file="./variables/development.tfvars"`
* Uncomment registry auth tf code blocks in main.tf then 
* `terraform apply -var-file="./variables/development.tfvars"`
* Get DO API access token and export it with `export DIGITALOCEAN_ACCESS_TOKEN=token here`
* Login to k8s cluster `doctl kubernetes cluster kubeconfig save $(terraform output -raw k8s-cluster-id)`
* login to registry `doctl registry login`
* Remember to push the images if they repo is empty!

Now apply helm stuff:

* Go to the settings for the registry and authorize the cluster to read from it under **"DigitalOcean Kubernetes integration"** section of the registry's settings.
* `cd ../k8s/helm/`
* Install, launching cluster and doing everything (hopefully) `helm install tcc-chart tcc-chart`
* check status with `kubectl get pods`.
* install sealed-secrets `kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.5/controller.yaml` - the helm chart doesn't work that well so use this instead :(

## Adding helm repos
* Search for the repo you want, by adding it and then searching
* Add the chart to Chart.yaml's dependencies section
* do `helm dependency update tcc-chart`
* Then `helm upgrade tcc-chart tcc-chart` to deploy the update

## Helm install

For envs. helm install: `helm install  tcc-dev tcc --values ./values/development.yaml --namespace dev`

## Secrets

* Install the sealed-secrets controller. THis will generate key-pairs and store them on the cluster.
  * `kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.5/controller.yaml`
* Then use `./encrypt-secret.sh` giving it the secret, the name of the secret and the namespace eg:
  * `./encrypt-secret.sh ssshhiamasecret earl-bot-secrets prod`   the name points to the metadata name in the `SealedSecret`