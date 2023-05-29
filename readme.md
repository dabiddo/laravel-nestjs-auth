#Laravel Passport & NestJs Shared Auth
This repo contains 2 small projects that serve as examples on how to make Laravel Passport Authentication be accepted in NestJs with the Passport Js library.

##Why?
At work we are migrating a Laravel Monolith App to Microservices, and we needed a way to transition users to the NestJs microservices using the same Jwt Token.

##How to Run the code?
I made my best to generate a fully functional VS Devcontainer environment,so you can run it right after cloning the repo, sadly I wasn't able to install NodeJs from the Dockerfile, so here are the instructions.

### Clone the repo.
`git clone <repo>`

Open the code in your favorite editor, if you are using devcontainers, you can run it as docker.

### devcontainers
Install Nodejs with NVM already installed in the Dockerfile.
`nvm install lts/hydrogen`

### Install Laravel
`cd laravel-auth`
`composer install`
### Modify the .env
The devcontainer workspace already has Mysql 5.7, so you can ahead and use the built in credentials
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laraveldb
DB_USERNAME=root
DB_PASSWORD=secret
```
### Run Migrations
`php artisan migrate`
### Install Passport
`php artisan passport:install`

### Install NestJs
The NestJs project already has all the libraries needed, so you can go ahead and just install with NPM
`cd nest-passport`
`npm install`

The Project already has harcoded connection to the Database, inside the `src/app.module.ts`