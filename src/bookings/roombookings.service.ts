import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateRoomBookingInput,
  RoomBookingFilter,
  UpdateRoomBookingInput,
} from './dto/roombooking.input';
import {
  RoomBooking,
  RoomBookingDocument,
  RoomBookingStatus,
} from './schemas/roombooking.schema';

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
        select: 'title rent',
      },
    });
  }

  async update(
    id: Types.ObjectId,
    updateRoomBookingInput: UpdateRoomBookingInput,
  ) {
    // const roomBookingUpdate = this.roomBookingModel.findByIdAndUpdate(
    //   id,
    //   updateRoomBookingInput,
    //   {
    //     new: true,
    //   },
    // );
    // if (!roomBookingUpdate) {
    //   throw new BadRequestException('Room Booking not found');
    // }

    /*
		
		3. Check-In Constraints
The system should prevent check-in for rooms marked with a maintenance status of true due to special circumstances. Standard cleaning processes should not affect room availability for check-in.
		
		*/

    const roomBooking: any = await this.roomBookingModel.findById(id, {
      populate: 'room',
    });

    if (
      !roomBooking ||
      (roomBooking?.room?.maintenanceReviewStatus &&
        updateRoomBookingInput.status === RoomBookingStatus.CHECKEDIN)
    ) {
      throw new BadRequestException('Room Booking not found');
    }

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

  remove(id: Types.ObjectId) {
    const roomBookingDelete = this.roomBookingModel.findByIdAndDelete(id);
    if (!roomBookingDelete) {
      throw new BadRequestException('Room Booking not found');
    }
    return roomBookingDelete;
  }

  async removeAll(id: Types.ObjectId) {
    const filter = {
      booking: id,
    };

    return this.roomBookingModel.deleteMany(filter);
  }
}
