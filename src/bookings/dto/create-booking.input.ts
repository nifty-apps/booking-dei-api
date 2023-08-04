import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { PaymentStatus } from '../enums/payment-status';

@InputType()
export class CreateBookingInput {
  @Field(() => PaymentStatus, { description: 'Payment status of the customer' })
  paymentStatus: PaymentStatus;

  @Field(() => ID, { description: 'Customer who made the booking' })
  customer: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  hotel: ObjectId;
}
