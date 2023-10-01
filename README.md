<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Repositorio de code challenge para geekbears, se trata de un acortador de url donde necesitaremos de una bd uri de Mongodb(puede ser local), para poder hacer funcionar el proyecto
## Installation


```bash
$ npm install
```

## NOTE
*crear .env en la raiz del proyecto*


## Steps 
1. Primeramente despues de instalar todas las dependencias necesitaremos de una base de datos Mongodb y su URI, para esto tendremos que dirigirnos a nuestro archiv que esta en la raiz del proyecto y crear un archivo .env o simplemente hacer `cp .env.example .env`

Esto nos ayudara a generear nuestra JWT_SECRET y Nuestra DB_URI como lo siguiente, favor de usar el siguiente codigo como ejemplo y poder copiarlo al .env
```
DB_URI=mongodb://localhost/geekbears
JWT_SECRET="secret?1234"
```

2. Una vez hecho eso ejecutamos el proyecto y todo deberia de correr con normalidad, ejecutamos `npm run start:dev`

3. La documentación la podemos ver en la pestaña de `http://localhost:3000/docs/` donde todos los endpoints están documentados con la herramienta de Swagger


## Objective

Se trata de un acortador de url que funciona siempre y cuando te hayas registrado y logueado primeramente, una vez logueado el response te arrojará un token:

Este token lo necesitaras poner como Bearer token dentro de la documentación de Swagger para poder hacer uso de el acortador

Posterior a esto deberas de decodear urls para poder usarlas como acortador, con el bearer token y solo necesitas un parametro llamado `original`

Te arrojara un parametro de tipo JSON y un atributo llamado `short` este lo ocuparas para decodear el url original





## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
