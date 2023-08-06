import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export enum RoomBookingStatus {
  BOOKED = 'BOOKED',
  CHECKEDIN = 'CHECKEDIN',
  CHECKEDOUT = 'CHECKEDOUT',
  CANCELLED = 'CANCELLED',
}

// Register the enum with GraphQL
registerEnumType(RoomBookingStatus, {
  name: 'RoomBookingStatus',
  description: 'Room booking status for a booking',
});

@ObjectType()
@Schema({ timestamps: true })
export class RoomBooking {
  @Field(() => ID, { description: 'Unique identifier for the room booking' })
  _id: ObjectId;

  @Field(() => ID, { description: 'Room where the booking were generated' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  })
  room: ObjectId;

  @Field(() => ID, { description: 'Unique identifier for the booking' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  })
  booking: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: ObjectId;

  @Field(() => RoomBookingStatus, {
    description: 'Room booking status of the booking',
  })
  @Prop({ required: true, enum: RoomBookingStatus })
  status: RoomBookingStatus;
}

export type RoomBookingDocument = HydratedDocument<RoomBooking>;
export const RoomBookingSchema = SchemaFactory.createForClass(RoomBooking);
