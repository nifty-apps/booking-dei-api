import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import {
  CreateRoomInput,
  RoomFilterInput,
  UpdateRoomInput,
} from './dto/room.input';
import {
  RoomBookingsOverview,
  RoomsByFloorResponse,
} from './dto/rooms-booking-status.response';
import { RoomsService } from './rooms.service';
import { RoomTypesService } from './roomtypes.service';
import { Room } from './schemas/room.schema';
import { RoomType } from './schemas/roomtype.schema';

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
  findAll(@Args('findByFilter') findByFilter: RoomFilterInput) {
    return this.roomsService.findAll(findByFilter);
  }

  @Query(() => [RoomsByFloorResponse], { name: 'roomsByFloor' })
  findAllWithBookingStatus(
    @Args('hotel', { type: () => ID }, ParseObjectIdPipe) hotel: Types.ObjectId,
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.roomsService.findRoomBookingsOverview(
      hotel,
      startDate,
      endDate,
    );
  }

  @Query(() => [RoomBookingsOverview], { name: 'roomBookingFinancials' })
  findAllWithFinancials(
    @Args('hotel', { type: () => ID }, ParseObjectIdPipe) hotel: Types.ObjectId,
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ) {
    return this.roomsService.findRoomBookingsFinancials(
      hotel,
      startDate,
      endDate,
    );
  }

  @Query(() => Room, { name: 'room' })
  findOne(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: Types.ObjectId,
  ) {
    return this.roomsService.findOne(id);
  }

  @Query(() => RoomType, { name: 'roomType' })
  findRoomType(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: Types.ObjectId,
  ) {
    return this.roomTypesService.findOne(id);
  }

  @Mutation(() => Room)
  async updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput._id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: Types.ObjectId,
  ) {
    return this.roomsService.remove(id);
  }
}
