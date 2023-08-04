import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { Booking } from './schemas/booking.schema';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

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
}
