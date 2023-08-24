import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Contact } from '../schemas/contact.schema';

@InputType()
export class CreateContactInput extends OmitType(Contact, ['_id'], InputType) {}

@InputType()
export class UpdateContactInput extends PartialType(Contact, InputType) {
  @Field(() => ID)
  @IsMongoId()
  _id: ObjectId;
}

@InputType()
export class ContactFilterInput extends PartialType(Contact, InputType) {
  @Field(() => ID)
  @IsMongoId()
  hotel: ObjectId;
}
