import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { Hotel } from '../schemas/hotel.schemas';

@InputType()
export class CreateHotelInput extends OmitType(Hotel, ['_id'], InputType) {}

@InputType()
export class UpdateHotelInput extends PartialType(Hotel, InputType) {
  @Field(() => ID)
  @IsMongoId()
  _id: Types.ObjectId;
}
