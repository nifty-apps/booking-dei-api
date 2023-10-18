import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Hotel } from 'src/hotels/schemas/hotel.schemas';

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
  _id: Types.ObjectId;

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
  @Prop({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  idNo?: string;

  @Field({ nullable: true, description: 'Address of the contact' })
  @Prop()
  @IsString()
  @IsOptional()
  address?: string;

  @Field(() => ID, { description: 'Hotel where the contact visited' })
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Hotel.name,
  })
  hotel: Types.ObjectId;

  @Field(() => ContactTypes, { description: 'Type of the contact' })
  @Prop({ required: true, enum: ContactTypes })
  @IsEnum(ContactTypes)
  type: ContactTypes;

  @Field({ nullable: true, description: 'Date of deactivation' })
  @Prop({ default: null })
  @IsDate()
  detactivatedAt: Date;
}

export type ContactDocument = HydratedDocument<Contact>;
export const ContactSchema = SchemaFactory.createForClass(Contact);
