import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { GetListsInput } from '../input/get-lists.input';
import { ListRepository } from '../../repository/list.repository';
import { ListMapper } from '../../mapper/list.mapper';
import { List } from '../models/list';

@Resolver()
export class ListQuery {
  @Inject(ListRepository)
  private readonly listRepository: ListRepository;
  @Query(() => [List])
  async lists(@Args('input') input: GetListsInput) {
    const res = await this.listRepository.getAll(input);

    return res.map((list) => ListMapper.toGraphql(list));
  }
}
