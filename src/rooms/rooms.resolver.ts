import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { RoomsService } from './rooms.service';
import { Room } from './schemas/room.schema';
import { RoomType } from './schemas/roomtype.schema';

@Resolver(() => Room)
@UseGuards(JwtAuthGuard)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
  ) {}

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll() {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput.id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.remove(id);
  }

  @ResolveField('type', () => RoomType)
  getType(@Parent() room: Room) {
    return this.roomsService.aggregate([
      {
        $lookup: {
          from: 'roomtypes',
          localField: 'type',
          foreignField: '_id',
          as: 'type',
        },
      },
      {
        $match: {
          _id: room._id,
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          description: 1,
        },
      },
    ]);
  }
}