import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsMongoId } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Booking } from './booking.schema';

export enum BookingLogType {
  BOOKED = 'BOOKED',
  UPDATED = 'UPDATED',
}

// Register the enum with GraphQL
registerEnumType(BookingLogType, {
  name: 'LogType', // this one is mandatory
  description: 'Log type for a booking', // this one is optional
});

@ObjectType()
@Schema({ timestamps: true })
export class BookingLog {
  @Field(() => ID, { description: 'Unique identifier for the log' })
  @IsMongoId()
  _id: Types.ObjectId;

  @Field(() => ID, { description: 'Unique identifier for the booking' })
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Booking.name,
  })
  @IsMongoId()
  booking: Types.ObjectId;

  @Field(() => ID, { description: 'User who made the action' })
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  @IsMongoId()
  user: Types.ObjectId;

  @Field(() => BookingLogType, { description: 'Payment status of the booking' })
  @Prop({ required: true, enum: BookingLogType })
  @IsEnum(BookingLogType)
  type: BookingLogType;

  @Field({ description: 'Log message creation date' })
  createdAt: Date;

  @Field({ description: 'Log message update date' })
  updatedAt: Date;
}

export type BookingLogDocument = HydratedDocument<BookingLog>;
export const BookingLogSchema = SchemaFactory.createForClass(BookingLog);
