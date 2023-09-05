import { Field, ID, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { Booking } from '../schemas/booking.schema';

@ObjectType()
export class BookingOverview extends PickType(Booking, ['_id'], InputType) {
  @Field(() => ID)
  _id: ObjectId;

  // @Field(() => Contact)
  // customer: Contact;

  //   @Field(() => [RoomBookingDetails])
  //   roombookings: RoomBookingDetails[];
}
