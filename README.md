# Express TypeScript Boilerplate Snippets

This document provides information about the available code snippets in this project. These snippets help you quickly create common code structures in your Express TypeScript application.

## Available Snippets

| Prefix                     | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `controller_algonom`       | Express controller template with index method                |
| `cronevent_algonom`        | Cron event template extending IBaseCronEvent                 |
| `dto_algonom`              | Data Transfer Object template with interface                 |
| `entity_algonom`           | Entity class template with interface body                    |
| `seqmodel_algonom`         | Sequelize model template with UUID primary key               |
| `mongoservice_algonom`     | MongoDB service class extending BaseMongoService             |
| `mongoschema_algonom`      | Mongoose schema template with audit and error handling       |
| `pgservice_algonom`        | PostgreSQL service class extending PostgresqlService         |
| `rabbitevent_algonom`      | RabbitMQ event consumer class extending IRabbitMQConsumer    |
| `redisservice_algonom`     | Redis service class extending RedisManager                   |
| `repository_algonom`       | Repository class extending BaseRepository                    |
| `service_algonom`          | Service class extending BaseService                          |
| `socketevent_algonom`      | Socket.io event class extending BaseSocketEvent              |
| `swaggerdocschema_algonom` | Documentation schema and hook template for API documentation |

## How to Use

1. Open a TypeScript file in VS Code
2. Type the prefix of the snippet you want to use (e.g., `controller_algonom`)
3. Press Tab or Enter to expand the snippet
4. Use Tab to navigate through the placeholder values and customize them according to your needs

## Note

All snippets are prefixed with `_algonom` to avoid conflicts with other snippets. Make sure to replace the placeholder values (like `Name`, `your_table_name`, etc.) with your actual values when using these snippets.
