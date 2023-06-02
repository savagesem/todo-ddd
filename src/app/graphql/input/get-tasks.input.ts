import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetTasksInput {
  @Field(() => Int, { nullable: true })
  listId?: number;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => Int, { defaultValue: 0 })
  offset: number;
}
