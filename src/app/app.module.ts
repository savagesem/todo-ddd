import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ListQuery,
  TaskMutation,
  TaskQuery,
  ListMutation,
} from './graphql/resolver';
import { TaskRepository } from './repository/task.repository';
import { PgProvider } from './db/pg.provider';

import * as useCases from './use-cases';
import { ListRepository } from './repository/list.repository';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    ListRepository,
    ...Object.values(useCases),
    PgProvider,
    TaskMutation,
    TaskQuery,
    ListMutation,
    ListQuery,
  ],
})
export class AppModule {}
