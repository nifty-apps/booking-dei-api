import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import {
  TransactionCategory,
  TransactionMethod,
  TransactionSubCategory,
} from '../schemas/transaction.schema';

@InputType()
export class CreateTransactionInput {
  @Field(() => ID, {
    description: 'Unique identifier for the booking',
    nullable: true,
  })
  @IsMongoId()
  booking?: ObjectId;

  @Field(() => ID, { description: 'Contact who made the booking' })
  @IsMongoId()
  contact: ObjectId;

  @Field(() => ID, { description: 'Hotel where the transaction was made' })
  @IsMongoId()
  hotel: ObjectId;

  @Field({ description: 'Date of the transaction' })
  @IsDate()
  date: Date;

  @Field(() => TransactionCategory, {
    description: 'Type of the transaction',
    nullable: true,
  })
  @IsEnum(TransactionCategory)
  category?: TransactionCategory;

  @Field(() => TransactionSubCategory, {
    description: 'Sub Category of the transaction',
    nullable: true,
  })
  @IsEnum(TransactionSubCategory)
  subCategory?: TransactionSubCategory;

  @Field(() => TransactionMethod, {
    description: 'Method of the transaction',
    nullable: true,
  })
  @IsEnum(TransactionMethod)
  method?: TransactionMethod;

  @Field({ nullable: true, description: 'Description of the transaction' })
  @IsString()
  description?: string;

  @Field({ description: 'Amount of the transaction' })
  @IsNumber()
  amount: number;
}
