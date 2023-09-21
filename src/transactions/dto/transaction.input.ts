import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Transaction } from '../schemas/transaction.schema';

@InputType()
export class CreateTransactionInput extends OmitType(
  Transaction,
  ['_id'],
  InputType,
) {}

@InputType()
export class UpdateTransactionInput extends PartialType(
  Transaction,
  InputType,
) {}

@InputType()
export class TransactionFilter extends PartialType(Transaction, InputType) {
  @Field(() => ID)
  @IsMongoId()
  hotel: ObjectId;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
