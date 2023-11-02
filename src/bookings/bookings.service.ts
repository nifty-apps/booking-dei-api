import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BookingFilter,
  CreateBookingInput,
  UpdateBookingInput,
} from './dto/booking.input';
import { RoomBookingService } from './roombookings.service';
import {
  BookingLog,
  BookingLogDocument,
  BookingLogType,
} from './schemas/booking-log.schema';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(BookingLog.name)
    private bookingLogModel: Model<BookingLogDocument>,
    private readonly roomBookingService: RoomBookingService,
  ) {}

  async create(createBookingInput: CreateBookingInput, user: Types.ObjectId) {
    const latestBooking = await this.bookingModel
      .findOne()
      .sort({ createdAt: -1 });
    const bookingNumber = latestBooking ? latestBooking.number + 1 : 1000;

    const booking = await this.bookingModel.create({
      customer: createBookingInput.customer,
      hotel: createBookingInput.hotel,
      paymentStatus: createBookingInput.paymentStatus,
      number: bookingNumber,
      guests: createBookingInput.guests,
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

      await this.roomBookingService.create({
        ...roomBooking,
        rent: roomBookingRent,
        booking: booking._id,
        hotel: createBookingInput.hotel,
      });
    });

    await this.bookingLogModel.create({
      booking: booking._id,
      type: BookingLogType.BOOKED,
      user: user,
    });

    return booking;
  }

  findAll(bookingFilter: BookingFilter) {
    return this.bookingModel.find(bookingFilter);
  }

  findOne(id: Types.ObjectId) {
    const booking = this.bookingModel.findById(id);
    return booking;
  }

  async update(
    id: Types.ObjectId,
    updateBookingInput: UpdateBookingInput,
    user: Types.ObjectId,
  ) {
    const booking = await this.bookingModel.findByIdAndUpdate(
      id,
      { $set: updateBookingInput },
      { new: true },
    );
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    await this.bookingLogModel.create({
      booking: booking._id,
      type: BookingLogType.UPDATED,
      user: user,
    });

    return booking;
  }

  async remove(id: Types.ObjectId) {
    await this.roomBookingService.removeAll(id);
    const booking = await this.bookingModel.findByIdAndDelete(id);
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    return booking;
  }
}
