import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TaskMutation } from './graphql/resolver/task.mutation';
import { TaskRepository } from './repository/task.repository';
import { PgProvider } from './db/pg.provider';
import { TaskQuery } from './graphql/resolver/task.query';

import * as useCases from './use-cases';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [
    TaskRepository,
    ...Object.values(useCases),
    PgProvider,
    TaskMutation,
    TaskQuery,
  ],
})
export class AppModule {}
