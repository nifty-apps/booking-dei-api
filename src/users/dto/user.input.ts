import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { User } from '../schemas/user.schema';

@InputType()
export class CreateUserInput extends OmitType(User, ['_id'], InputType) {}

@InputType()
export class UpdateUserInput extends PartialType(User, InputType) {
  @Field(() => ID)
  @IsMongoId()
  _id: Types.ObjectId;
}

@InputType()
export class UserFilterInput extends PartialType(User, InputType) {}
