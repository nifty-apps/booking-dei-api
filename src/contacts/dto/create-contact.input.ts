import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { ContactTypes } from '../schemas/contact.schema';

@InputType()
export class CreateContactInput {
  @Field({ description: 'Name of the contact' })
  @IsString()
  name: string;

  @Field({ description: 'Phone Number of the contact' })
  @IsString()
  @Length(11, 11, { message: 'Phone number must be exactly 11 digits long' })
  @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
  phone: string;

  @Field({ nullable: true, description: 'NID of the contact' })
  @IsNumber()
  @IsOptional()
  @Length(10, 17, { message: 'NID must be exactly 10 digits long' })
  @Matches(/^\d+$/, { message: 'NID must contain only digits' })
  nid?: number;

  @Field({ nullable: true, description: 'Address of the contact' })
  @IsString()
  @IsOptional()
  address?: string;

  @Field(() => ID, { description: 'Hotel where the contact visited' })
  hotel: ObjectId;

  @Field(() => ContactTypes, { description: 'Type of the contact' })
  @IsEnum(ContactTypes)
  type: string;
}
