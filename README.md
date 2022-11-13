# The Coder Career - Community site + Jobs Platform

> Copyright 2022 The Coder Career Ltd
> Proprietary intellectual property belonging to The Coder Career

This is the mono-repo for The Coder Career platform.

```
.
├── README.md                     ( this doc )
├── docs                        
├── earl-bot                     ( earl bot project)
├── infrastructure          ( all k8s and tf for all services)
└── web-portal                ( web portal project )
```

With the exception of `docs` and `infrastructure` each directory in the repo is a project within The Coder Career stack. A project is built into a corresponding container image, and that image is run as container(s) on the cluster.


## Web Platform / Portal `./web-portal`


The Web plaform is the main webapp for thecodercareer.com Serving the public facing website, and authed web-apps for TCC Community and TCC Hiring.

Tech wise, the Web Platform is a Next.js app that has it's own front-end and back end.  


To find out everything else about the Web Platform look in the [README](./web-portal/README.md) in the `./web-portal` project

# Earl Bot `./earl-bot`

Discord bot for the TCC Discord. The opportunities are limitless, but Earls primary function is to help community members connect their Discord profile to their TCC account (feature in development).

Has a basic in-development API available under api.thecodercareer.com.

To find out everything else about Earl Bot look at the 
[README](./earl-bot/README.md) in the `./earl-bot` project.

# Infrastucture `./infrastructure'

Not a project, but the location of all the code that sets up infrastucture for The Coder Career lives here.

More info in the infrastructure [README](./infrastructure/README.md) 