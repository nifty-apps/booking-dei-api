import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ObjectId } from 'mongoose';
import { PaymentStatus } from '../schemas/booking.schema';
import { CreateRoomBookingInput } from './create-roombooking.input';

@InputType()
export class CreateBookingInput {
  @Field(() => ID, { description: 'Contact who made the booking' })
  contact: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  hotel: ObjectId;

  @Field(() => [CreateRoomBookingInput], {
    description: 'Room bookings of the booking',
  })
  roomBookings: CreateRoomBookingInput[];

  @Field(() => PaymentStatus, {
    nullable: true, //TODO: for drop down enum in postman
    description: 'Payment status of the customer',
  })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
