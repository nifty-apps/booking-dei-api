import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { RoomBooking } from '../schemas/roombooking.schema';

@InputType()
export class CreateRoomBookingInput extends OmitType(
  RoomBooking,
  ['_id'],
  InputType,
) {}

@InputType()
export class UpdateRoomBookingInput extends PartialType(
  RoomBooking,
  InputType,
) {}
