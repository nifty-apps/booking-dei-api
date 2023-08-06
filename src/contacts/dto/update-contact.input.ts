import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateContactInput } from './create-contact.input';

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {
  @Field(() => Int)
  id: number;
}
