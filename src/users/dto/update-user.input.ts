import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID, { description: 'User ID' })
  id: ObjectId;
}
