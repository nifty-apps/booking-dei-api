import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { UserDocument, UserType } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_id: Types.ObjectId): Promise<UserDocument> {
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

  async signup(name: string, phone: string, password: string) {
    const existingPhone = await this.usersService.findAll({ phone });
    // if existingPhone is empty array, throw an error
    if (existingPhone.length) {
      throw new UnauthorizedException('Phone number already exists');
    }
    const hotels = [];
    const type = UserType.ADMIN;

    const user = await this.usersService.create({
      name,
      hotels,
      type,
      phone,
      password,
    });

    return user;
  }
}
