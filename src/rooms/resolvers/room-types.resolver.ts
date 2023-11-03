import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import {
  CreateRoomTypeInput,
  RoomTypeFilterInput,
  UpdateRoomTypeInput,
} from '../dto/room-type.input';
import { RoomType } from '../schemas/roomtype.schema';
import { RoomTypesService } from '../services/room-types.service';

@Resolver(() => RoomType)
@UseGuards(JwtAuthGuard)
export class RoomTypesResolver {
  constructor(private readonly roomTypesService: RoomTypesService) {}

  @Mutation(() => RoomType)
  createRoomType(
    @Args('createRoomTypeInput') createRoomTypeInput: CreateRoomTypeInput,
  ) {
    return this.roomTypesService.create(createRoomTypeInput);
  }

  @Query(() => [RoomType], { name: 'roomTypes' })
  findAll(@Args('findByFilter') findByFilter: RoomTypeFilterInput) {
    return this.roomTypesService.findAll(findByFilter);
  }

  @Query(() => RoomType, { name: 'roomType' })
  findOne(
    @Args('id', { type: () => ID }, ParseObjectIdPipe) id: Types.ObjectId,
  ) {
    return this.roomTypesService.findOne(id);
  }

  @Mutation(() => RoomType)
  async updateRoomType(
    @Args('updateRoomTypeInput') updateRoomTypeInput: UpdateRoomTypeInput,
  ) {
    return this.roomTypesService.update(
      updateRoomTypeInput._id,
      updateRoomTypeInput,
    );
  }
}
