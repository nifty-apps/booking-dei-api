import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class RoomBookingFilter {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  hotelId: ObjectId;

  @Field(() => Date, { nullable: true })
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  endDate?: Date;
}
