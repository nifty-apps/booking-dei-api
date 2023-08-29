import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/schemas/user.schema';

@ObjectType()
export class LoginResponseDto {
  @Field()
  access_token: string;

  @Field()
  user: User;
}
