# Todo service

Build a service to manage Todos.

## Requirements

- Features
  - [X] API to query Todos (potentially many!)
    - Query Todos that are not done
    - Todos can be grouped in lists
  - [X] API to add a Todo
  - [X] API to update Todos
    - Mark Todos as done
  - [X] We would like you to integrate with another service provider. It can be any Todo service (e.g. Microsoft Todo APIs), or you can also use a mock provider. Todos should be kept in sync between our service and the third-party integration
    - Todos created in the third-party integration should always be created in our service
    - The status of todos should always be in sync between our service and the integration

- Tech
  - If possible use a relational DB, PostgreSQL would be perfect!
  - Provide data model for Todos

Bonus:
  - Let's create GraphQL APIs
  - typescript would be great, but most common languages are okay

> Note: We expect you to treat the challenge as a real world production app development that is meant to:
Scale to 10+ engineers contributing simultaneous
> Wherever you might have to take shortcuts point it out and explain what you would do differently!
> We would like you to take assumptions and decisions of how the product and the third-party integration should work, if needed you can highlight and explain decisions in a README inside the project.
 
