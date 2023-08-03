import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateRoomInput {
  @Field({ description: 'Number of the room' })
  number: number;

  @Field(() => ID, { description: 'Hotel where the room is located' })
  hotel: ObjectId;

  @Field(() => ID, { description: 'Type of the room' })
  type: ObjectId;
}
