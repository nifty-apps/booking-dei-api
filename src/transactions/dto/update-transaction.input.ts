import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CreateTransactionInput } from './create-transaction.input';

@InputType()
export class UpdateTransactionInput extends PartialType(
  CreateTransactionInput,
) {
  @Field(() => ID)
  id: ObjectId;
}
