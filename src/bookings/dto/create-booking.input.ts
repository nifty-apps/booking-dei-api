import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
import { PaymentStatus } from '../schemas/booking.schema';
import { CreateRoomBookingInput } from './create-roombooking.input';

@InputType()
export class CreateBookingInput {
  @Field(() => ID, { description: 'Contact who made the booking' })
  @IsMongoId()
  contact: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  @IsMongoId()
  hotel: ObjectId;

  @Field(() => [CreateRoomBookingInput], {
    description: 'Room bookings of the booking',
  })
  roomBookings: CreateRoomBookingInput[];

  @Field({ nullable: true, description: 'Total Rent for the booking' })
  @IsNumber()
  totalBookingRent?: number;

  @Field({ nullable: true, description: 'Discount for the booking' })
  @IsNumber()
  discount?: number;

  @Field(() => PaymentStatus, {
    nullable: true, //TODO: for drop down enum in postman
    description: 'Payment status of the customer',
  })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
