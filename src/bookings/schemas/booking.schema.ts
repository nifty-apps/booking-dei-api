import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsMongoId } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Contact } from 'src/contacts/schemas/contact.schema';
import { Hotel } from 'src/hotels/schemas/hotel.schemas';

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
@InputType('GuestInput')
@Schema()
class Guest {
  @Field({ description: 'Name of the guest' })
  @Prop({ type: String, required: true })
  name: string;

  @Field({ nullable: true, description: 'Phone number of the guest' })
  @Prop()
  phone?: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Booking {
  @Field(() => ID, { description: 'Unique identifier for the booking' })
  @IsMongoId()
  _id: Types.ObjectId;

  @Field(() => ID, { description: 'Customer who made the booking' })
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Contact.name,
  })
  @IsMongoId()
  customer: Types.ObjectId;

  @Field(() => [Guest], {
    nullable: true,
    description: 'Guests for the booking',
  })
  @Prop()
  guests?: Guest[];

  @Field(() => ID, { description: 'Hotel where the booking were generated' })
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Hotel.name,
  })
  @IsMongoId()
  hotel: Types.ObjectId;

  @Field(() => PaymentStatus, { description: 'Payment status of the booking' })
  @Prop({ required: true, enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}

export type BookingDocument = HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
