import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateBookingInput, UpdateBookingInput } from './dto/booking.input';
import { RoomBookingService } from './roombookings.service';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly roomBookingService: RoomBookingService,
  ) {}

  async create(createBookingInput: CreateBookingInput) {
    const booking = await this.bookingModel.create({
      customer: createBookingInput.customer,
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

      await this.roomBookingService.create({
        ...roomBooking,
        rent: roomBookingRent,
        booking: booking._id,
        hotel: createBookingInput.hotel,
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
