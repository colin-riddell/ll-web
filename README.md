# TCC - Web Platform

## How do I

### Run it locally

* Make sure you've got the `.env.local` in the root of the project. (same level as this file, not the root of the repo)
* Run the mongodb container (`docker-compose up` from this dir)
* build and run with `yarn` then `yarn dev`
* Have fun

### Deploy to dev

* build, tag and push the container image:
  * `docker build -t web-portal  . `
  * `docker tag web-portal:latest registry.digitalocean.com/tcc-registry/web-portal:0.0.4` incrementing the version to match the deployment
  * `docker push registry.digitalocean.com/tcc-registry/web-portal:0.0.4`
  * `cd ../infrastructure/k8s/helm/`
  *  `helm upgrade  tcc-dev tcc --values ./values/development.yaml --namespace dev` Either update the version in development.yaml or set it on the command line with --set
  *  check it in `k9s`

### Deploy to prod
Same as above but for prod values

### Test it 


## Useful links

* Next SSR
  * https://nextjs.org/docs/basic-features/data-fetching/overview
* Chakra 
  * https://chakra-ui.com/
  * https://chakra-templates.dev/
  * https://chakra-ui.com/docs/components/media-and-icons/icon
* Next MDX
  * https://nextjs.org/docs/advanced-features/using-mdx (look at this for blog stuff?)
  * https://nextjs.org/blog/markdown
* Tailwind
  * Typography Prose (for rendering HTML generated from MD): https://tailwindcss.com/docs/typography-plugin
* Formik
  * https://formik.org/
  * Field: https://formik.org/docs/api/field
  * Chakra + Formik: https://chakra-ui.com/docs/components/form/form-control
* DynamoDB
  * https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html
  * Increment https://stackoverflow.com/questions/14077414/dynamodb-increment-a-key-value
* Notion Blog on Next **TODO**
  * https://github.com/samuelkraft/notion-blog-nextjs
* AWS Amplify + deploy TF
   * https://sreeraj.dev/setting-up-aws-amplify-for-a-next-js-ssr-app-with-terraform/
   * https://www.youtube.com/watch?v=7PoKyVCTcS8
   * or use next-tf module: https://github.com/milliHQ/terraform-aws-next-js