import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { BookingsService } from './bookings.service';
import { CreateBookingInput, UpdateBookingInput } from './dto/booking.input';
import { Booking } from './schemas/booking.schema';

@Resolver(() => Booking)
@UseGuards(JwtAuthGuard)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation(() => Booking, {
    name: 'createBooking',
  })
  createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
    @CurrentUser('_id') user: Types.ObjectId,
  ) {
    return this.bookingsService.create(createBookingInput, user);
  }

  @Query(() => [Booking], {
    name: 'bookings',
  })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Query(() => Booking, {
    name: 'booking',
  })
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.bookingsService.findOne(id);
  }

  @Mutation(() => Booking, {
    name: 'updateBooking',
  })
  async updateBooking(
    @Args('updateBookingInput') updateBookingInput: UpdateBookingInput,
    @CurrentUser('_id') user: Types.ObjectId,
  ) {
    return this.bookingsService.update(
      updateBookingInput._id,
      updateBookingInput,
      user,
    );
  }

  @Mutation(() => Booking, {
    name: 'removeBooking',
    description: 'Delete booking by ID',
  })
  removeBooking(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.bookingsService.remove(id);
  }
}
