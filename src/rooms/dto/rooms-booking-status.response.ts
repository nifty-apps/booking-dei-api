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
]) {
  @Field({ nullable: true })
  bookingCustomer?: string;
  @Field({ nullable: true })
  bookingPayment?: number;
  @Field({ nullable: true })
  bookingRent?: number;
  @Field({ nullable: true })
  bookingDue?: number;
  @Field({ nullable: true })
  paymentStatus?: string;
}

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
  roombookings: RoomBookingDetails[];
}

@ObjectType({ description: 'Response for rooms by floor with bookings' })
export class RoomsByFloorResponse {
  @Field()
  floor: string;

  @Field(() => [RoomBookingsOverview])
  rooms: RoomBookingsOverview[];
}
