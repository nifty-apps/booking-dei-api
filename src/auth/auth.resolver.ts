import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto copy';
import { SignUpResponseDto } from './dto/signup-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto, { name: 'login' })
  async login(
    @Args('phone') phone: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(phone, password);
  }

  @Mutation(() => SignUpResponseDto, { name: 'signup' })
  async signup(
    @Args('phone') phone: string,
    @Args('name') name: string,
    @Args('password') password: string,
  ) {
    return this.authService.signup(name, phone, password);
  }
}
