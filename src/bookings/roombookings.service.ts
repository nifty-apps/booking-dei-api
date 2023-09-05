import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  CreateRoomBookingInput,
  UpdateRoomBookingInput,
} from './dto/roombooking.input';
import { RoomBookingFilter } from './dto/roombookingfilter.input';
import { RoomBooking, RoomBookingDocument } from './schemas/roombooking.schema';

@Injectable()
export class RoomBookingService {
  constructor(
    @InjectModel(RoomBooking.name)
    private roomBookingModel: Model<RoomBookingDocument>,
  ) {}

  async create(createRoomBookingInput: CreateRoomBookingInput) {
    const roomBooking = await this.roomBookingModel.create({
      ...createRoomBookingInput,
    });
    return roomBooking;
  }

  findAll() {
    return this.roomBookingModel.find();
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

    return this.roomBookingModel.find(filter).populate({
      path: 'room',
      select: 'number',
      populate: {
        path: 'type',
        select: 'title',
      },
    });
  }

  update(id: ObjectId, updateRoomBookingInput: UpdateRoomBookingInput) {
    const roomBookingUpdate = this.roomBookingModel.findByIdAndUpdate(
      id,
      updateRoomBookingInput,
      {
        new: true,
      },
    );
    if (!roomBookingUpdate) {
      throw new BadRequestException('Room Booking not found');
    }
    return roomBookingUpdate;
  }

  remove(id: ObjectId) {
    const roomBookingDelete = this.roomBookingModel.findByIdAndDelete(id);
    if (!roomBookingDelete) {
      throw new BadRequestException('Room Booking not found');
    }
    return roomBookingDelete;
  }
}
