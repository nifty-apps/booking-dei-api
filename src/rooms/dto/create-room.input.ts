import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateRoomInput {
  @Field({ description: 'Number of the room' })
  @IsNumber()
  number: number;

  @Field(() => ID, { description: 'Hotel where the room is located' })
  hotel: ObjectId;

  @Field(() => ID, { description: 'Type of the room' })
  type: ObjectId;
}
