import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { RoomBooking } from '../schemas/roombooking.schema';

@InputType()
export class RoomBookingFilter extends PartialType(RoomBooking, InputType) {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  hotel: Types.ObjectId;
}
