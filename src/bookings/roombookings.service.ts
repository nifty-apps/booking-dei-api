import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateRoomBookingInput,
  RoomBookingFilter,
  UpdateRoomBookingInput,
} from './dto/roombooking.input';
import { RoomBooking, RoomBookingDocument } from './schemas/roombooking.schema';
import { MaintenancesService } from 'src/maintenances';

@Injectable()
export class RoomBookingService {
  constructor(
    @InjectModel(RoomBooking.name)
    private roomBookingModel: Model<RoomBookingDocument>,
    private readonly maintenanceService: MaintenancesService,
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
    const roomBooking = await this.roomBookingModel.findById(
      updateRoomBookingInput._id,
    );

    const checkoutAtBeforeUpdate = roomBooking.checkOut;
    roomBooking.set(updateRoomBookingInput);
    await roomBooking.save();

    // Pre checkout room assessment
    if (!checkoutAtBeforeUpdate && updateRoomBookingInput.checkOut) {
      // TODO: This condition is a temporary solution as my assignment
      // is a related.
      // But this shows how the maintenance service will be notified about checkout event
      await this.maintenanceService.notifyCheckout({
        booking: roomBooking.booking,
        hotel: roomBooking.hotel,
        room: roomBooking.room,
        checkoutAt: roomBooking.checkOut,
      });
    }

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
    return roomBooking;
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
