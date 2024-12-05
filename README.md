## DOCKER STATUS PRESENTER

Knows a few endpoints:

 - /ps runs `docker ps`
 - /service_ls runs `docker service ls`
 - /service_ps?name=abcd runs `docker service ps abcd`, but only if abcd is in the ALLOWED_SERVICES env variable
 - /node_ls runs `docker node ls`
