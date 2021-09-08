Aplicación backend para la administración de eventos a través de una agenda.

Está creada en base:

* NodeJS
* Typescript
* BcryptJS
* Express
* MongoDB
* Autenticación con JWT

### Despliegue en Heroku por primera vez

1. Crear una aplicación en Heroku y escoger la opción "Heroku Git"
2. En la raíz del proyecto ejecutar mediante consola ``heroku login``
3. En la raíz del proyecto ejecutar mediante consola  ``heroku git:clone -a calendar-app-backend-ic``


### Despliegue de cambios

1. Subir cambios a git
2. En la raíz del proyecto ejecutar mediante consola ``git push heroku main``git


Seguimientos de logs en Heroku: en la consola ejecutar: ``heroku logs --tail``
