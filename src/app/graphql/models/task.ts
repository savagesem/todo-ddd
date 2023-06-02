import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  title: string;
}
