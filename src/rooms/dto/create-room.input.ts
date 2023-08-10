import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateRoomInput {
  @Field({ description: 'Number or name of the room' })
  @IsString()
  number: string;

  @Field(() => ID, { description: 'Hotel where the room is located' })
  hotel: ObjectId;

  @Field(() => ID, { description: 'Type of the room' })
  type: ObjectId;
}
