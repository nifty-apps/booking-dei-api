import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { Contact } from '../schemas/contact.schema';

@InputType()
export class CreateContactInput extends OmitType(Contact, ['_id'], InputType) {}

@InputType()
export class UpdateContactInput extends PartialType(Contact, InputType) {
  @Field(() => ID)
  @IsMongoId()
  _id: Types.ObjectId;
}

@InputType()
export class ContactFilterInput extends PartialType(Contact, InputType) {
  @Field(() => ID)
  @IsMongoId()
  hotel: Types.ObjectId;
}
