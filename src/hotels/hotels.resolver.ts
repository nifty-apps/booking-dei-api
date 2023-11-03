import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateHotelInput, UpdateHotelInput } from './dto/hotel.input';
import { HotelsService } from './hotels.service';
import { Hotel } from './schemas/hotel.schemas';

@Resolver(() => Hotel)
@UseGuards(JwtAuthGuard)
export class HotelsResolver {
  constructor(private readonly hotelsService: HotelsService) {}

  @Mutation(() => Hotel)
  createHotel(@Args('createHotelInput') createHotelInput: CreateHotelInput) {
    return this.hotelsService.create(createHotelInput);
  }

  @Query(() => [Hotel], { name: 'hotels' })
  findAll() {
    return this.hotelsService.findAll();
  }

  @Query(() => Hotel, { name: 'hotel' })
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.hotelsService.findOne(id);
  }

  @Mutation(() => Hotel)
  updateHotel(@Args('updateHotelInput') updateHotelInput: UpdateHotelInput) {
    return this.hotelsService.update(updateHotelInput._id, updateHotelInput);
  }

  @Mutation(() => Hotel)
  removeHotel(@Args('id', { type: () => Int }) id: number) {
    return this.hotelsService.remove(id);
  }
}
