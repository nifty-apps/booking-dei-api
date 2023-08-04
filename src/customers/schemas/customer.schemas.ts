import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Customer {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  _id: ObjectId;

  @Field({ description: 'Name of the customer' })
  @Prop({ required: true })
  name: string;

  @Field({ description: 'Phone Number of the customer' })
  @Prop({ required: true })
  phone: string;

  @Field({ nullable: true, description: 'NID of the customer' })
  @Prop()
  nid?: number;

  @Field({ nullable: true, description: 'Address of the customer' })
  @Prop()
  address?: string;

  @Field(() => ID, { description: 'Hotel where the customer visited' })
  @Prop({
    required: true,
    type: mongoose.Schema,
    ref: 'Hotel',
  })
  hotel: ObjectId;
}

export type CustomerDocument = HydratedDocument<Customer>;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
