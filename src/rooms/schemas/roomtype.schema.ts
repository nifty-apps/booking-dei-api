import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Hotel } from 'src/hotels/schemas/hotel.schemas';

@ObjectType()
@Schema({ timestamps: true })
export class RoomType {
  @Field(() => ID, { description: 'Unique identifier of the room' })
  _id: Types.ObjectId;

  @Field({ description: 'Title of the room type' })
  @Prop({ type: String, required: true })
  title: string;

  @Field({ description: 'Rent of the room type' })
  @Prop({ type: Number, required: true })
  rent: number;

  @Field(() => ID, { description: 'Hotel where the room is located' })
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Hotel.name })
  hotel: Types.ObjectId;
}

export type RoomTypeDocument = HydratedDocument<RoomType>;
export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);
