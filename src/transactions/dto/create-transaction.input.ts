import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import {
  TransactionSource,
  TransactionType,
} from '../schemas/transaction.schema';

@InputType()
export class CreateTransactionInput {
  @Field(() => ID, { description: 'Contact who made the booking' })
  contact: ObjectId;

  @Field(() => TransactionType, { description: 'Type of the transaction' })
  type: TransactionType;

  @Field(() => TransactionSource, { description: 'Source of the transaction' })
  source: TransactionSource;

  @Field({ description: 'Amount of the transaction' })
  amount: number;
}
