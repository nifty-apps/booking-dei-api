import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
class RoomTypeDetails {
  @Field()
  title: string;

  @Field()
  rent: number;
}

@ObjectType()
class RoomBookingDetails {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  rent: number;

  @Field()
  booking: string;

  @Field()
  discount: number;

  @Field()
  checkIn: Date;

  @Field()
  checkOut: Date;

  @Field()
  status: string;
}

@ObjectType()
class RoomBookingsOverview {
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
