import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

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
}
