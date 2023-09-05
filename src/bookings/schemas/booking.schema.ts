import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsMongoId } from 'class-validator';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PARTIAL_PAID = 'PARTIAL_PAID',
  PAID = 'PAID',
}

// Register the enum with GraphQL
registerEnumType(PaymentStatus, {
  name: 'PaymentStatus', // this one is mandatory
  description: 'Payment status for a booking', // this one is optional
});

@ObjectType()
@Schema({ timestamps: true })
export class Booking {
  @Field(() => ID, { description: 'Unique identifier for the booking' })
  @IsMongoId()
  _id: ObjectId;

  @Field(() => ID, { description: 'Contact who made the booking' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  })
  @IsMongoId()
  contact: ObjectId;

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  @IsMongoId()
  hotel: ObjectId;

  @Field(() => PaymentStatus, { description: 'Payment status of the booking' })
  @Prop({ required: true, enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}

export type BookingDocument = HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
