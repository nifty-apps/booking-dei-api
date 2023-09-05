import { Field, ID, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { RoomBooking } from 'src/bookings/schemas/roombooking.schema';
import { RoomType } from '../schemas/roomtype.schema';

@ObjectType()
export class RoomTypeDetails extends OmitType(RoomType, ['_id', 'hotel']) {}

@ObjectType()
export class RoomBookingDetails extends PickType(RoomBooking, [
  '_id',
  'rent',
  'booking',
  'discount',
  'checkIn',
  'checkOut',
  'status',
]) {}

@ObjectType()
export class RoomBookingsOverview {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  number: string;

  @Field(() => RoomTypeDetails)
  type: RoomTypeDetails;

  @Field()
  floor: string;

  @Field()
  position: string;

  @Field(() => [RoomBookingDetails])
  bookings: RoomBookingDetails[];
}

@ObjectType({ description: 'Response for rooms by floor with bookings' })
export class RoomsByFloorResponse {
  @Field()
  floor: string;

  @Field(() => [RoomBookingsOverview])
  rooms: RoomBookingsOverview[];
}
