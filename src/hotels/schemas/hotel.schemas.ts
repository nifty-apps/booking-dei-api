import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Hotel {
  @Field(() => ID, { description: 'Unique identifier of the hotel' })
  _id: Types.ObjectId;

  @Field(() => String, { description: 'Name of the hotel' })
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true, description: 'Address of the hotel' })
  @Prop()
  address?: string;
}

export type HotelDocument = HydratedDocument<Hotel>;
export const HotelSchema = SchemaFactory.createForClass(Hotel);
