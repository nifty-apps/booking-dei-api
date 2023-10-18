import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsResolver } from './bookings.resolver';
import { BookingsService } from './bookings.service';
import { RoomBookingsResolver } from './roombookings.resolver';
import { RoomBookingService } from './roombookings.service';
import { BookingLog, BookingLogSchema } from './schemas/booking-log.schema';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { RoomBooking, RoomBookingSchema } from './schemas/roombooking.schema';
import { BookingLogResolver } from './booking-log.resolver';
import { BookingLogService } from './booking-log.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: RoomBooking.name, schema: RoomBookingSchema },
      { name: BookingLog.name, schema: BookingLogSchema },
    ]),
  ],
  providers: [
    BookingsResolver,
    RoomBookingsResolver,
    BookingsService,
    RoomBookingService,
    BookingLogResolver,
    BookingLogService,
  ],
  exports: [BookingsService],
})
export class BookingsModule {}
