import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import {
  TransactionCategory,
  TransactionMethod,
  TransactionSubCategory,
} from '../schemas/transaction.schema';

@InputType()
export class TransactionFilter {
  @Field(() => ID, { nullable: true })
  hotelId?: ObjectId;

  @Field(() => ID, { nullable: true })
  contactId?: ObjectId;

  @Field(() => ID, { nullable: true })
  bookingId?: ObjectId;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Field(() => TransactionMethod, { nullable: true })
  method?: TransactionMethod;

  @Field(() => TransactionCategory, { nullable: true })
  category?: TransactionCategory;

  @Field(() => TransactionSubCategory, { nullable: true })
  subCategory?: TransactionSubCategory;
}
