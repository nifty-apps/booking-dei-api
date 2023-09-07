import {
  Field,
  ID,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { Room } from 'src/rooms/schemas/room.schema';
import { RoomType } from 'src/rooms/schemas/roomtype.schema';
import { RoomBooking } from '../schemas/roombooking.schema';

@ObjectType()
class RoomTypeResponse extends PickType(RoomType, ['_id', 'title', 'rent']) {}

@ObjectType()
class RoomResponse extends PickType(Room, ['_id', 'number']) {
  @Field(() => RoomTypeResponse, { description: 'Type of the room' })
  type: RoomTypeResponse;
}

@ObjectType()
export class RoomBookingResponse extends PartialType(
  OmitType(RoomBooking, ['room']),
) {
  @Field(() => ID, { description: 'Unique identifier for the room booking' })
  _id: ObjectId;

  @Field(() => RoomResponse, { description: 'Type of the room' })
  room: RoomResponse;
}
