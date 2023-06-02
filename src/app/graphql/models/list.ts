import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class List {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
