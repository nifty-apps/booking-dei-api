import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/users/schemas/user.schema';

@ObjectType()
export class SignUpResponseDto {
  @Field({ description: 'Name of the user' })
  name: string;

  @Field({ nullable: true, description: 'Email of the user' })
  email?: string;

  @Field({ description: 'Phone number of the user' })
  phone?: string;

  @Field({ description: 'Password of the user' })
  password?: string;

  // @Field({ description: 'Hotels of the user' })
  // hotels: string[];

  @Field(() => UserType, { description: 'Type of the user' })
  type?: UserType;

  @Field({ nullable: true, description: 'Date of deactivation' })
  detactivatedAt?: Date;
}
