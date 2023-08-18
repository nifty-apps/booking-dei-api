import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'src/users/schemas/user.schema';

@ObjectType()
export class UserResponseDto extends OmitType(User, ['password']) {}

@ObjectType()
export class LoginResponseDto {
  @Field()
  access_token: string;

  @Field()
  user: UserResponseDto;
}
