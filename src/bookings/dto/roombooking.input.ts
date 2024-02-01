import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { RoomBooking } from '../schemas/roombooking.schema';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateRoomBookingInput extends OmitType(
  RoomBooking,
  ['_id'],
  InputType,
) {}

@InputType()
export class UpdateRoomBookingInput extends PartialType(
  RoomBooking,
  InputType,
) {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  _id: Types.ObjectId;
}

@InputType()
export class RoomBookingFilter extends PartialType(RoomBooking, InputType) {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  hotel: Types.ObjectId;
}
