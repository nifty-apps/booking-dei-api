import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { RoomType } from '../schemas/roomtype.schema';

@InputType()
export class CreateRoomTypeInput extends OmitType(
  RoomType,
  ['_id'],
  InputType,
) {}

@InputType()
export class UpdateRoomTypeInput extends PartialType(RoomType, InputType) {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  _id: Types.ObjectId;
}

@InputType()
export class RoomTypeFilterInput extends PartialType(RoomType, InputType) {
  @Field(() => ID)
  @IsMongoId()
  hotel: Types.ObjectId;
}
