import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsResolver } from './bookings.resolver';
import { BookingsService } from './bookings.service';
import { RoomBookingsResolver } from './roombookings.resolver';
import { RoomBookingService } from './roombookings.service';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { RoomBooking, RoomBookingSchema } from './schemas/roombooking.schema';
@Module({
  imports: [
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Booking.name,
    //     useFactory: () => {
    //       const schema = BookingSchema;
    //       schema.virtual('roomBookings', {
    //         ref: RoomBooking.name,
    //         localField: '_id',
    //         foreignField: 'booking',
    //       });
    //       //   // schema.virtual('room', {
    //       //   //   ref: RoomBooking.name,
    //       //   //   localField: '_id',
    //       //   //   foreignField: 'booking',
    //       //   // });

    //       return schema;
    //     },
    //   },
    // ]),
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: RoomBooking.name, schema: RoomBookingSchema },
    ]),
  ],
  providers: [
    BookingsResolver,
    RoomBookingsResolver,
    BookingsService,
    RoomBookingService,
  ],
})
export class BookingsModule {}
