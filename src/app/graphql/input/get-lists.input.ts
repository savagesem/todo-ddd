import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetListsInput {
  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => Int, { defaultValue: 0 })
  offset: number;
}
