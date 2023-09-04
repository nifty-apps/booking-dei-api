import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId, Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { RoomBookingFilter } from './dto/roombookingfilter.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { UpdateRoomBookingInput } from './dto/update-roombooking.input';
import { RoomBookingService } from './roombookings.service';
import { Booking } from './schemas/booking.schema';
import { RoomBooking } from './schemas/roombooking.schema';

@Resolver(() => Booking)
@UseGuards(JwtAuthGuard)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly roomBookingsService: RoomBookingService,
  ) {}

  @Mutation(() => Booking, {
    name: 'createBooking',
    description: 'Create booking',
  })
  createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ) {
    return this.bookingsService.create(createBookingInput);
  }

  @Query(() => [Booking], {
    name: 'bookings',
    description: 'Find all bookings',
  })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Query(() => Booking, { name: 'booking', description: 'Find booking by ID' })
  findOne(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.bookingsService.findOne({ _id: id });
  }

  @Mutation(() => Booking, {
    name: 'updateBooking',
    description: 'Update booking',
  })
  async updateBooking(
    @Args('id', { type: () => ID }) id: ObjectId,
    @Args('updateBookingInput') updateBookingInput: UpdateBookingInput,
  ) {
    return this.bookingsService.update(id, updateBookingInput);
  }

  @Mutation(() => Booking, {
    name: 'removeBooking',
    description: 'Delete booking by ID',
  })
  removeBooking(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.bookingsService.remove(id);
  }

  @Query(() => [RoomBooking], {
    name: 'roomBookings',
    description: 'Find all room bookings',
  })
  findRoomBookings(
    @Args('roomBookingFilter') roomBookingFilter: RoomBookingFilter,
  ) {
    return this.roomBookingsService.findRoomBookings(roomBookingFilter);
  }

  @Mutation(() => [RoomBooking], {
    name: 'updateRoomBooking',
    description: 'Update room booking by ID',
  })
  async updateRoomBooking(
    @Args('id', { type: () => ID }) id: ObjectId,
    @Args('updateRoomBookingInput')
    updateRoomBookingInput: UpdateRoomBookingInput,
  ) {
    const updatedRoomBooking = await this.roomBookingsService.update(
      id,
      updateRoomBookingInput,
    );
    return updatedRoomBooking; // Return the updated room booking after the update
  }

  @Mutation(() => RoomBooking, {
    name: 'removeRoomBooking',
    description: 'Delete room booking by ID',
  })
  removeRoomBooking(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.roomBookingsService.remove(id);
  }
}
