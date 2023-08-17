import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class RoomBookingFilter {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  hotelId: ObjectId;

  @Field(() => Date, { nullable: true })
  checkIn?: Date;

  @Field(() => Date, { nullable: true })
  checkOut?: Date;
}
