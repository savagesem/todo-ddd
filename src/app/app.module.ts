import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TaskMutation } from './graphql/resolver/task.mutation';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskUseCase } from './use-cases/create-task.use-case';
import { PgProvider } from './db/pg.provider';
import { TaskQuery } from './graphql/resolver/task.query';
import { GetAllTasksUseCase } from './use-cases/get-all-task.use-case';

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
    CreateTaskUseCase,
    GetAllTasksUseCase,
    PgProvider,
    TaskMutation,
    TaskQuery,
  ],
})
export class AppModule {}
