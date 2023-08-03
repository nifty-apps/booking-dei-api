import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HotelsService } from './hotels.service';
import { Hotel } from './schemas/hotel.schemas';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Resolver(() => Hotel)
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hotelsService.findOne(id);
  }

  @Mutation(() => Hotel)
  updateHotel(@Args('updateHotelInput') updateHotelInput: UpdateHotelInput) {
    return this.hotelsService.update(updateHotelInput.id, updateHotelInput);
  }

  @Mutation(() => Hotel)
  removeHotel(@Args('id', { type: () => Int }) id: number) {
    return this.hotelsService.remove(id);
  }
}
