import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingLogService } from './booking-log.service';
import { BookingLogFilter } from './dto/booking-log.input';
import { BookingLog } from './schemas/booking-log.schema';

@Resolver(() => BookingLog)
@UseGuards(JwtAuthGuard)
export class BookingLogResolver {
  constructor(private readonly bookingLogService: BookingLogService) {}

  @Query(() => [BookingLog], { name: 'bookingLogs' })
  findAll(
    @Args('filter')
    filter: BookingLogFilter,
  ) {
    return this.bookingLogService.findAll(filter);
  }
}
