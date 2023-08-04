import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { RoomBookingStatus } from '../schemas/roombooking.schema';

@InputType()
export class CreateRoomBookingInput {
  @Field(() => ID, { description: 'Room where the booking were generated' })
  room: ObjectId;

  @Field(() => RoomBookingStatus, {
    description: 'Room booking status of the Room booking',
  })
  status: RoomBookingStatus;
}
