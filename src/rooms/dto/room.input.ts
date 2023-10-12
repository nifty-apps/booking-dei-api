import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { Room } from '../schemas/room.schema';

@InputType()
export class CreateRoomInput extends OmitType(Room, ['_id'], InputType) {}

@InputType()
export class UpdateRoomInput extends PartialType(Room, InputType) {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  _id: Types.ObjectId;
}

@InputType()
export class RoomFilterInput extends PartialType(Room, InputType) {
  @Field(() => ID)
  @IsMongoId()
  hotel: Types.ObjectId;
}
