# Authentication & Authorization Starter with Angular and Spring Boot

Here is the backend repository: https://github.com/codeblox-codes/spring-boot-examples/tree/master/spring-security-full-stack

This Spring Boot Authentication Starter provides a quick setup for implementing authentication in your Spring Boot applications using Spring Security and JWT (JSON Web Token) for secure communication between client and server.

### Functionalities
- Registration: By default the user has a USER role. When a user register an email containing a code is sent to the email. The user has to validate his account with the code sent. 
- Login: The user login using his email and his password. An access token and a refresh token are generated. The access token is used on the header of every request that requires authentication. And if the access token has expired, the user can request for another one using the refresh token. If the refresh token also has expired, the user is kicked out of his account.
- Update password

<!-- ### Endpoints
![spring security starter endpoints](swagger.png) -->

