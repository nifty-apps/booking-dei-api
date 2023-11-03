import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateUserInput,
  UpdateUserInput,
  UserFilterInput,
} from './dto/user.input';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  async findAll(filter: UserFilterInput) {
    return this.userModel.find(filter);
  }

  findOne(query: Partial<User>) {
    return this.userModel.findOne(query);
  }

  update(id: Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
    });
  }
}
