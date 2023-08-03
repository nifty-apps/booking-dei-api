import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHotelInput {
  @Field({ description: 'Name of the hotel' })
  name: string;

  @Field({ nullable: true, description: 'Address of the hotel' })
  address?: string;
}
