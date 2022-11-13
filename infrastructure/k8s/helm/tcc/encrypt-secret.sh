#!/bin/bash

# provide unencrypted secret as argument in plain text
# provide name of SealedSecret it will go into as second arg
# provide namespace
# encrypt and print it out
# you then save it to wherever you need in sealed secrets  etc

# must be able to kubectl into a cluster that has sealed-secrets installed and has 
# generated public+private keys

# must have kubeseal installed `brew install kubeseal` (I think)


# usage: ./encrypt-secret.sh secret name-of-secret eg:
#    ./encrypt-secret.sh ssshimasecret earl-bot-secrets
# note the name attribute is the name of the SealedSecret that you'll apply
# to the cluster

# inspired by: https://gist.github.com/foogunlana/b75175b4ff62bc07258ea78274c698cd
# but hopefully a lot simpler.

echo -n $1 | kubeseal --raw  --name $2 --namespace=$3 --scope namespace-wide --from-file=/dev/stdin