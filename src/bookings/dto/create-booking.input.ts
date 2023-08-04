import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { PaymentStatus } from '../schemas/booking.schema';
import { CreateRoomBookingInput } from './create-roombooking.input';

@InputType()
export class CreateBookingInput {
  @Field(() => ID, { description: 'Customer who made the booking' })
  customer: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  hotel: ObjectId;

  @Field(() => [CreateRoomBookingInput], {
    description: 'Room bookings of the booking',
  })
  roomBookings: CreateRoomBookingInput[];

  @Field(() => PaymentStatus, { description: 'Payment status of the customer' })
  paymentStatus: PaymentStatus;
}
