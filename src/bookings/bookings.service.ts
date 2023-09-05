import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateBookingInput, UpdateBookingInput } from './dto/booking.input';
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
      contact: createBookingInput.customer,
      hotel: createBookingInput.hotel,
      paymentStatus: createBookingInput.paymentStatus,
    });

    createBookingInput.roomBookings.forEach(async (roomBooking) => {
      const roomRent = roomBooking.rent;
      const extraBedCost = roomBooking.extraBed ? 500 : 0;
      const extraBreakfastCost = roomBooking.extraBreakfast ? 500 : 0;
      const discount = roomBooking.discount || 0;
      //TODO: Remove the calculation from backend for roomBookingRent
      const roomBookingRent =
        roomRent + extraBedCost + extraBreakfastCost - discount;
      // TODO: Add roomBookingRent from frontend
      // booking.totalBookingRent = booking.totalBookingRent || 0;
      // booking.totalBookingRent += roomBookingRent;

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

  findOne(id: ObjectId) {
    const booking = this.bookingModel.findById(id);
    return booking;
  }

  async update(id: ObjectId, updateBookingInput: UpdateBookingInput) {
    const booking = await this.bookingModel.findByIdAndUpdate(
      id,
      { $set: updateBookingInput },
      { new: true },
    );
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    return booking;
  }

  async remove(id: ObjectId) {
    const booking = await this.bookingModel.findByIdAndDelete(id);
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    return booking;
  }
}
