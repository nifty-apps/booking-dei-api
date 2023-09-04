import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { RoomBookingFilter } from './dto/roombookingfilter.input';
import { UpdateRoomBookingInput } from './dto/update-roombooking.input';
import { RoomBooking, RoomBookingDocument } from './schemas/roombooking.schema';

@Injectable()
export class RoomBookingService {
  constructor(
    @InjectModel(RoomBooking.name)
    private roomBookingModel: Model<RoomBookingDocument>,
  ) {}

  findAll() {
    return this.roomBookingModel.find();
  }

  findOne(id: ObjectId) {
    return this.roomBookingModel.findById(id);
  }

  async findRoomBookings(roomBookingFilter: RoomBookingFilter) {
    const filter: any = {
      ...roomBookingFilter,
    };
    if (roomBookingFilter.checkIn) {
      filter['checkIn'] = { $gte: roomBookingFilter.checkIn };
    }
    if (roomBookingFilter.checkOut) {
      filter['checkOut'] = { $lte: roomBookingFilter.checkOut };
    }

    return this.roomBookingModel.find(filter);
  }

  update(id: ObjectId, updateRoomBookingInput: UpdateRoomBookingInput) {
    return this.roomBookingModel.findByIdAndUpdate(id, updateRoomBookingInput, {
      new: true,
    });
  }

  remove(id: ObjectId) {
    return this.roomBookingModel.findByIdAndDelete(id);
  }
}
