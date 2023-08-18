import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_id: ObjectId): Promise<UserDocument> {
    return this.usersService.findOne({ _id });
  }

  async login(phone: string, password: string) {
    const user = await this.usersService.findOne({ phone });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user && user.password === password) {
      const userData = user.toJSON();
      delete userData.password;

      const payload = { sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        user: userData,
      };
    }
  }
}
