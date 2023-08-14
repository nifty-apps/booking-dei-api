import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CreateBookingInput } from './create-booking.input';

@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  @Field(() => ID, { description: 'Booking ID' })
  id: ObjectId;
}
