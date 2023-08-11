import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsResolver } from './bookings.resolver';
import { BookingsService } from './bookings.service';
import { RoomBookingService } from './roombookings.service';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { RoomBooking, RoomBookingSchema } from './schemas/roombooking.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: RoomBooking.name, schema: RoomBookingSchema },
    ]),
  ],
  providers: [BookingsResolver, BookingsService, RoomBookingService],
})
export class BookingsModule {}
