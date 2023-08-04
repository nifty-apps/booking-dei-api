import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  name: string;

  @Field({ description: 'Email of the user' })
  email: string;

  @Field({ description: 'Phone number of the user' })
  phone: string;
}
