import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Booking } from '../schemas/booking.schema';
import { CreateRoomBookingInput } from './roombooking.input';

@InputType()
export class CreateBookingInput extends OmitType(Booking, ['_id'], InputType) {
  @Field(() => [CreateRoomBookingInput], {
    description: 'Room bookings of the booking',
  })
  roomBookings: CreateRoomBookingInput[];
}

@InputType()
export class UpdateBookingInput extends PartialType(Booking, InputType) {}
