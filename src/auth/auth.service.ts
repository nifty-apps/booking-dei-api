import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(phone);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { password, ...result } = user;

    return {
      accessToken: 'jwt', // TODO: implement JWT
      user: result,
    };
  }
}
