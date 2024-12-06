## DOCKER STATUS PRESENTER

Knows a few endpoints:

 - /ps runs `docker ps`
 - /service_ls runs `docker service ls`
 - /service_ps?name=abcd runs `docker service ps abcd --no-trunc`, but only if `abcd` is in the ALLOWED_SERVICES env variable
 - /node_ls runs `docker node ls`

### ENVIRONMENT VARIABLES

| Name             | Explanation                                           | Type                   | Example                                              | Default Value       |
|------------------|-------------------------------------------------------|------------------------|------------------------------------------------------|---------------------|
| ALLOWED_SERVICES | Which services are queryable with `docker service ps` | comma-seperated String | `foo,bar` to enable the two services `foo` and `bar` | No services allowed |


### EXPOSED SERVICE

The Express Server gets exposed on port 7777
