import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RoomBookingFilter {
  @Field(() => ID, { nullable: true })
  hotelId?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
