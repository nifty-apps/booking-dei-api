import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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
      totalBookingRent: createBookingInput.totalBookingRent,
      discount: createBookingInput.discount,
      due: createBookingInput.due,
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

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: ObjectId, updateBookingInput: UpdateBookingInput) {
    return this.bookingModel.findByIdAndUpdate(
      id,
      { $set: updateBookingInput },
      { new: true },
    );
  }

  async remove(id: number) {
    const booking = await this.bookingModel.findByIdAndDelete(id);
    return booking;
  }
}
