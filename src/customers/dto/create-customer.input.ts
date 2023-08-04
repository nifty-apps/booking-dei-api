import { InputType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class CreateCustomerInput {
  @Field({ description: 'Name of the customer' })
  name: string;

  @Field({ description: 'Phone Number of the customer' })
  phone: string;

  @Field({ description: 'NID of the customer' })
  nid?: number;

  @Field({ description: 'Address of the customer' })
  address?: string;

  @Field(() => ID, { description: 'Hotel where the customer visited' })
  hotel: ObjectId;
}
