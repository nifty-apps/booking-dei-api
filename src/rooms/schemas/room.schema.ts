import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { RoomType } from './roomtype.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Room {
  @Field(() => ID, { description: 'Unique identifier of the room' })
  _id: Types.ObjectId;

  @Field({ description: 'Number or name of the room' })
  @Prop({ required: true })
  number: string;

  @Field({ description: 'Floor where the room is located' })
  @Prop({ required: true })
  floor: string;

  @Field({ description: 'Position of the room' })
  @Prop({ required: true })
  position: string;

  @Field(() => ID, { description: 'Type of the room' })
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: RoomType.name,
  })
  type: Types.ObjectId;

  @Field(() => ID, { description: 'Hotel where the room is located' })
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Hotel' })
  hotel: Types.ObjectId;
}

export type RoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
