import { Inject } from '@nestjs/common';
import { ListRepository } from '../repository/list.repository';
import { ListEntity } from '../entity/list.entity';

interface CreateListInput {
  name: string;
}

export class CreateListUseCase {
  @Inject()
  private readonly listRepository: ListRepository;

  public async execute(input: CreateListInput) {
    const entity = ListEntity.create({
      name: input.name,
    });

    const res = await this.listRepository.save(entity);
    return res.rowCount > 0;
  }
}
