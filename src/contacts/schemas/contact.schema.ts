import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export enum ContactTypes {
  CUSTOMER = 'CUSTOMER',
  EMPLOYEE = 'EMPLOYEE',
  VENDOR = 'VENDOR',
}

// Register the enum with GraphQL
registerEnumType(ContactTypes, {
  name: 'ContactTypes', // this one is mandatory
  description: 'The type of the contact', // this one is optional
});

@ObjectType()
@Schema({ timestamps: true })
export class Contact {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  _id: ObjectId;

  @Field({ description: 'Name of the contact' })
  @Prop({ required: true })
  name: string;

  @Field({ description: 'Phone Number of the contact' })
  @Prop({ required: true })
  phone: string;

  @Field({ nullable: true, description: 'NID of the contact' })
  @Prop()
  nid?: number;

  @Field({ nullable: true, description: 'Address of the contact' })
  @Prop()
  address?: string;

  @Field(() => ID, { description: 'Hotel where the contact visited' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: ObjectId;

  @Field(() => ContactTypes, { description: 'Type of the contact' })
  @Prop({ required: true, enum: ContactTypes })
  type: ContactTypes;
}

export type ContactDocument = HydratedDocument<Contact>;
export const ContactSchema = SchemaFactory.createForClass(Contact);
