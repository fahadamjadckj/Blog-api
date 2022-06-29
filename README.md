# Blog-api
This is the backend for a blog written entirely in express/node.js.
## Features
1. jsonwebtoken authentication
2. username and password validation for assigning tokens
3. custom middleware checkToken to verify the token and only access to post, delete and put methods.
## usage:
The api requires the following environment variables to be set:
1. PORT= (ex: 8080)
2. JWT_KEY= (ex:'something') it is used as the secret key for signing json tokens
3. DB_STRING='your mongodb connection string'
4. DEBUG="auth,post,api:server' to enable logs via debug module.
## Caution:
Currently there is no route defined to add more users for the jsontoken validation, you have to manually add them to the database, PS: I may add such feature in future.