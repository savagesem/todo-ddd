# Todo ddd

## Before you start

You need to install the following tools:
1. Flyway
2. Docker
3. Docker-compose
4. Node.js

## How to run the application

1. Run `npm install` to install all dependencies
2. Run `docker-compose up -d` to start the infrastructure
3. Run `npm run migrate` to run the database migrations
4. Run `npm start` to start the api
5. Go to `http://localhost:3005/graphql` to see graphql playground

## How to run the tests
1. Start the infrastructure
2. Start the api
3. Run `npm test` to run integration tests

