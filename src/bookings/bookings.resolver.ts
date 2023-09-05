import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingInput, UpdateBookingInput } from './dto/booking.input';
import { Booking } from './schemas/booking.schema';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';

@Resolver(() => Booking)
@UseGuards(JwtAuthGuard)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

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

  @Query(() => Booking, {
    name: 'booking',
    description: 'Find booking by ID',
  })
  findOne(@Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId) {
    return this.bookingsService.findOne(id);
  }

  @Mutation(() => Booking, {
    name: 'updateBooking',
    description: 'Update booking',
  })
  async updateBooking(
    @Args('updateBookingInput') updateBookingInput: UpdateBookingInput,
  ) {
    return this.bookingsService.update(
      updateBookingInput._id,
      updateBookingInput,
    );
  }

  @Mutation(() => Booking, {
    name: 'removeBooking',
    description: 'Delete booking by ID',
  })
  removeBooking(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.bookingsService.remove(id);
  }
}
