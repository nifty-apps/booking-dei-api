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
import { RoomTypesService } from './roomtypes.service';
import { Room } from './schemas/room.schema';
import { RoomType } from './schemas/roomtype.schema';
import { populate } from 'mongoose';

@Resolver(() => Room)
@UseGuards(JwtAuthGuard)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly roomTypesService: RoomTypesService,
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

  // TODO: Optimize this query with populate
  @ResolveField('type', () => RoomType)
  getType(@Parent() room: Room) {
    return room.populate('type');
  }
}