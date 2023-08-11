import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { RoomBooking, RoomBookingDocument } from './schemas/roombooking.schema';

@Injectable()
export class RoomBookingService {
  constructor(
    @InjectModel(RoomBooking.name)
    private roomBookingModel: Model<RoomBookingDocument>,
  ) {}
  // create(createRoomInput: CreateRoomInput) {
  //   return this.roomTypeModel.create(createRoomInput);
  // }

  findAll() {
    return this.roomBookingModel.find();
  }

  findOne(id: ObjectId) {
    return this.roomBookingModel.findById(id);
  }

  async findRoomBookingsDateRange(
    hotelId: ObjectId,
    startDate: Date,
    endDate: Date,
  ) {
    return this.roomBookingModel.find({
      hotel: hotelId,
      checkIn: { $gte: startDate },
      checkOut: { $lte: endDate },
    });
  }

  // update(id: number, updateRoomInput: UpdateRoomInput) {
  //   return `This action updates a #${id} room`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} room`;
  // }
}
