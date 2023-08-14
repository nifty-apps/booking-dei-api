import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CreateRoomBookingInput } from './create-roombooking.input';

@InputType()
export class UpdateRoomBookingInput extends PartialType(
  CreateRoomBookingInput,
) {
  @Field(() => ID, { description: 'Room Booking ID' })
  id: ObjectId;
}
