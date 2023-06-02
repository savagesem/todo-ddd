import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  status: string;
}
