import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { RoomBooking, RoomBookingDocument } from './schemas/roombooking.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(RoomBooking.name)
    private roomBookingModel: Model<RoomBookingDocument>,
  ) {}

  async create(createBookingInput: CreateBookingInput) {
    const booking = await this.bookingModel.create({
      contact: createBookingInput.contact,
      hotel: createBookingInput.hotel,
      paymentStatus: createBookingInput.paymentStatus,
    });

    createBookingInput.roomBookings.forEach(async (roomBooking) => {
      await this.roomBookingModel.create({
        room: roomBooking.room,
        booking: booking._id,
        hotel: createBookingInput.hotel,
        status: roomBooking.status,
        checkIn: roomBooking.checkIn,
        checkOut: roomBooking.checkOut,
      });
    });

    return booking;
  }

  findAll() {
    return this.bookingModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingInput: UpdateBookingInput) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }

  async getRoomBookingsByHotelAndDateRange(hotelId: ObjectId, startDate: Date, endDate: Date) {
    return this.roomBookingModel.find({
      hotel: hotelId,
      checkIn: { $gte: startDate, $lte: endDate },
    });
  }
}