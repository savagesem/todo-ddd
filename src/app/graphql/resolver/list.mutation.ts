import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreateListUseCase } from '../../use-cases';

@Resolver()
export class ListMutation {
  @Inject(CreateListUseCase)
  private readonly createListUseCase: CreateListUseCase;

  @Mutation(() => Boolean)
  async createList(@Args('name') name: string) {
    return this.createListUseCase.execute({ name });
  }
}
