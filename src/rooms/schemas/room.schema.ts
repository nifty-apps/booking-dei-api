import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Room {
  @Field(() => ID, { description: 'Unique identifier of the room' })
  @IsMongoId()
  _id: ObjectId;

  @Field({ description: 'Number of the room' })
  @Prop({ required: true })
  number: number;

  @Field(() => ID, { description: 'Hotel where the room is located' })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
  hotel: ObjectId;

  @Field(() => ID, { description: 'Type of the room' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
  })
  type: ObjectId;
}

export type RoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
