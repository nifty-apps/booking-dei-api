import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export enum ContactTypes {
  CUSTOMER = 'CUSTOMER',
  EMPLOYEE = 'EMPLOYEE',
  VENDOR = 'VENDOR',
}

export enum ContactIdTypes {
  NID = 'NID',
  PASSPORT = 'PASSPORT',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
}

// Register the enum with GraphQL
registerEnumType(ContactTypes, {
  name: 'ContactTypes',
  description: 'The type of the contact',
});

registerEnumType(ContactIdTypes, {
  name: 'ContactIdTypes',
  description: 'The type of the contact ID',
});

@ObjectType()
@Schema({ timestamps: true })
export class Contact {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  @IsMongoId()
  _id: ObjectId;

  @Field({ description: 'Name of the contact' })
  @Prop({ type: String, required: true })
  @IsString()
  name: string;

  @Field({ description: 'Phone number of the contact' })
  @Prop({ required: true })
  @IsString()
  phone: string;

  @Field(() => ContactIdTypes, {
    nullable: true,
    description: 'ID type of the contact',
  })
  @Prop({ type: String, enum: ContactIdTypes, nullable: true })
  @IsString()
  @IsOptional()
  @IsEnum(ContactIdTypes)
  idType?: ContactIdTypes;

  @Field({ nullable: true, description: 'ID number of the contact' })
  @Prop({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  idNo?: number;

  @Field({ nullable: true, description: 'Address of the contact' })
  @Prop()
  @IsString()
  @IsOptional()
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
  @IsEnum(ContactTypes)
  type: ContactTypes;
}

export type ContactDocument = HydratedDocument<Contact>;
export const ContactSchema = SchemaFactory.createForClass(Contact);
