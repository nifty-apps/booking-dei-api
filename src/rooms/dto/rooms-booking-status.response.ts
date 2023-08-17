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
export class RoomBookingsOverviewResponse {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  number: number;

  @Field(() => RoomTypeDetails)
  type: RoomTypeDetails;

  @Field(() => [RoomBookingDetails])
  bookings: RoomBookingDetails[];
}
