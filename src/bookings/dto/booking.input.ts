import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Booking } from '../schemas/booking.schema';
import { RoomBooking } from '../schemas/roombooking.schema';

@InputType()
class RoomBookingInput extends OmitType(
  RoomBooking,
  ['_id', 'booking', 'hotel'],
  InputType,
) {}

@InputType()
export class CreateBookingInput extends OmitType(Booking, ['_id'], InputType) {
  @Field(() => [RoomBookingInput], {
    description: 'Room bookings of the booking',
  })
  @ValidateNested()
  @Type(() => RoomBookingInput)
  roomBookings: RoomBookingInput[];
}

@InputType()
export class UpdateBookingInput extends PartialType(Booking, InputType) {}
