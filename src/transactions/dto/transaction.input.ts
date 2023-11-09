import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Transaction } from '../schemas/transaction.schema';

@InputType()
export class CreateTransactionInput extends OmitType(
  Transaction,
  ['_id', 'user'],
  InputType,
) {}

@InputType()
export class UpdateTransactionInput extends PartialType(
  Transaction,
  InputType,
) {}

@InputType()
export class TransactionFilter extends PartialType(Transaction, InputType) {
  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
