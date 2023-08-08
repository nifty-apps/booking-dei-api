import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';

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
}
