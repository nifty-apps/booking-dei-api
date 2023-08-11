import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { RoomBookingFilter } from './dto/roombookingfilter.input';
import { UpdateBookingInput } from './dto/update-booking.input';
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

  @Mutation(() => Booking)
  createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ) {
    return this.bookingsService.create(createBookingInput);
  }

  @Query(() => [Booking], { name: 'bookings' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookingsService.findOne(id);
  }

  @Mutation(() => Booking)
  updateBooking(
    @Args('updateBookingInput') updateBookingInput: UpdateBookingInput,
  ) {
    return this.bookingsService.update(
      updateBookingInput.id,
      updateBookingInput,
    );
  }

  @Mutation(() => Booking)
  removeBooking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingsService.remove(id);
  }

  @Query(() => [RoomBooking], { name: 'roomBookings' })
  findRoomBookings(
    @Args('roomBookingFilter') roomBookingFilter: RoomBookingFilter,
  ) {
    return this.roomBookingsService.findRoomBookings(roomBookingFilter);
  }
}
