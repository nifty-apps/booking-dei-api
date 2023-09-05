import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  CreateRoomBookingInput,
  UpdateRoomBookingInput,
} from './dto/roombooking.input';
import { RoomBookingResponse } from './dto/roombooking.response';
import { RoomBookingFilter } from './dto/roombookingfilter.input';
import { RoomBookingService } from './roombookings.service';
import { Booking } from './schemas/booking.schema';
import { RoomBooking } from './schemas/roombooking.schema';

@Resolver(() => Booking)
@UseGuards(JwtAuthGuard)
export class RoomBookingsResolver {
  constructor(private readonly roomBookingsService: RoomBookingService) {}

  @Mutation(() => RoomBooking, {
    name: 'createRoomBooking',
    description: 'Create room booking',
  })
  createRoomBooking(
    @Args('createRoomBookingInput')
    createRoomBookingInput: CreateRoomBookingInput,
  ) {
    return this.roomBookingsService.create(createRoomBookingInput);
  }

  @Query(() => [RoomBookingResponse], {
    name: 'roomBookings',
  })
  findRoomBookings(
    @Args('roomBookingFilter') roomBookingFilter: RoomBookingFilter,
  ) {
    return this.roomBookingsService.findRoomBookings(roomBookingFilter);
  }

  @Mutation(() => RoomBooking, {
    name: 'updateRoomBooking',
    description: 'Update room booking by ID',
  })
  updateRoomBooking(
    @Args('updateRoomBookingInput')
    updateRoomBookingInput: UpdateRoomBookingInput,
  ) {
    return this.roomBookingsService.update(
      updateRoomBookingInput._id,
      updateRoomBookingInput,
    );
  }

  @Mutation(() => RoomBooking, {
    name: 'removeRoomBooking',
    description: 'Delete room booking by ID',
  })
  removeRoomBooking(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.roomBookingsService.remove(id);
  }
}
