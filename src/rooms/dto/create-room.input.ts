import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateRoomInput {
  @Field({ description: 'Number or name of the room' })
  @IsString()
  number: string;

  @Field({ description: 'Room status', defaultValue: 'available' })
  @IsString()
  status: string | 'available';

  @Field(() => ID, { description: 'Hotel where the room is located' })
  @IsMongoId()
  hotel: ObjectId;

  @Field(() => ID, { nullable: true, description: 'Type of the room' })
  @IsMongoId()
  type?: ObjectId;
}
