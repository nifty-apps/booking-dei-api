import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateRoomInput } from './create-room.input';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => Int)
  id: number;

  // @Field({ description: 'Room Number' })
  // @IsNumber()
  // number: number;

  // @Field({ description: 'Room Rent' })
  // @IsNumber()
  // rent: number;

  // @Field({ description: 'Room Type' })
  // type: string;
}
