import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { RoomType } from './roomtype.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Room {
  @Field(() => ID, { description: 'Unique identifier of the room' })
  @IsMongoId()
  _id: Types.ObjectId;

  @Field({ description: 'Number or name of the room' })
  @Prop({ required: true })
  @IsString()
  number: string;

  @Field({ description: 'Floor where the room is located' })
  @Prop({ required: true })
  @IsString()
  floor: string;

  @Field({ description: 'Position of the room' })
  @Prop({ required: true })
  @IsString()
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

  @Field({ nullable: true, description: 'Date of deactivation' })
  @Prop({ default: null })
  @IsDate()
  @IsOptional()
  detactivatedAt?: Date;

  /* 
		1. Guest Checkout Trigger
	Upon guest checkout, the system should mark the room for a maintenance review. This does not automatically imply a need for maintenance but indicates a need for housekeeping assessment.
	*/
  @Field({ description: 'Maintenance Review Status' })
  @Prop({ default: false })
  @IsOptional()
  maintenanceReviewStatus: boolean;
}

export type RoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
