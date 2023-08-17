import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Room {
  @Field(() => ID, { description: 'Unique identifier of the room' })
  _id: ObjectId;

  @Field({ description: 'Number or name of the room' })
  @Prop({ required: true })
  number: string;

  @Field({ nullable: true, description: 'Rent of the room' })
  @Prop()
  originalRent?: number;

  @Field(() => ID, { description: 'Type of the room' })
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
  })
  type?: ObjectId;

  @Field(() => ID, { description: 'Hotel where the room is located' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
  hotel: ObjectId;
}

export type RoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
