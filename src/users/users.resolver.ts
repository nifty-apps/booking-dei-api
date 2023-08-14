import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser', description: 'Create user' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users', description: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', description: 'Get user by ID' })
  findOne(@Args('phone', { type: () => String }) phone: string) {
    return this.usersService.findOne(phone);
  }

  @Mutation(() => User, { name: 'updateUser', description: 'Update user' })
  updateUser(
    @Args('id', { type: () => ID }) id: ObjectId,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, {
    name: 'removeUser',
    description: 'Delete user by ID',
  })
  removeUser(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.usersService.remove(id);
  }
}
