import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  @IsString()
  name: string;

  @Field({ nullable: true, description: 'Email of the user' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ description: 'Phone number of the user' })
  @IsString()
  @Length(11, 11, { message: 'Phone number must be exactly 11 digits long' })
  @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
  phone: string;

  @Field({ description: 'Password of the user' })
  @IsString()
  password: string;
}
