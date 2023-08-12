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
      const roomRent = roomBooking.rent;
      const extraBedCost = roomBooking.extraBed ? 500 : 0;
      const extraBreakfastCost = roomBooking.extraBreakfast ? 500 : 0;
      const discount = roomBooking.discount || 0;

      const roomBookingRent =
        roomRent + extraBedCost + extraBreakfastCost - discount;
      booking.totalBookingRent += roomBookingRent;
      console.log(booking.totalBookingRent);

      await this.roomBookingModel.create({
        room: roomBooking.room,
        booking: booking._id,
        hotel: createBookingInput.hotel,
        status: roomBooking.status,
        checkIn: roomBooking.checkIn,
        checkOut: roomBooking.checkOut,
        rent: roomBookingRent,
        discount,
        extraBed: roomBooking.extraBed,
        extraBreakfast: roomBooking.extraBreakfast,
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

  async remove(id: number) {
    const booking = await this.bookingModel.findByIdAndDelete(id);
    return booking;
  }
}