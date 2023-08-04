import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { PaymentStatus } from '../enums/payment-status';

@ObjectType()
@Schema({ timestamps: true })
export class Booking {
  @Field(() => ID, { description: 'Unique identifier for the booking' })
  _id: ObjectId;

  @Field(() => PaymentStatus, { description: 'Payment status of the booking' })
  @Prop({ required: true, enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @Field(() => ID, { description: 'Customer who made the booking' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  })
  customer: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: ObjectId;
}

export type BookingDocument = HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
