import { Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ContactTypes } from '../schemas/contact.schema';

@InputType()
export class CreateContactInput {
  @Field({ description: 'Name of the contact' })
  name: string;

  @Field({ description: 'Phone Number of the contact' })
  phone: string;

  @Field({ nullable: true, description: 'NID of the contact' })
  nid?: number;

  @Field({ nullable: true, description: 'Address of the contact' })
  address?: string;

  @Field(() => ID, { description: 'Hotel where the contact visited' })
  hotel: ObjectId;

  @Field(() => ContactTypes, { description: 'Type of the contact' })
  type: string;
}
