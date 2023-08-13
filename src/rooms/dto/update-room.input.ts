import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';
import { CreateRoomInput } from './create-room.input';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => ID) // Decorate the field with the appropriate type
  @IsMongoId() // Validate the field is a MongoDB ObjectId
  id: ObjectId;

  // @Field({ description: 'Room Number' })
  // @IsNumber()
  // number: number;

  // @Field({ description: 'Room Rent' })
  // @IsNumber()
  // rent: number;

  // @Field({ description: 'Room Type' })
  // type: string;
}
