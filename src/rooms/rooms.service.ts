import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  create(createRoomInput: CreateRoomInput) {
    return this.roomModel.create(createRoomInput);
  }

  findAll(hotel: ObjectId) {
    return this.roomModel.find({ hotel });
  }

  findRoomBookingsOverview(hotel: ObjectId, startDate: Date, endDate: Date) {
    return this.roomModel.aggregate([
      {
        $match: {
          hotel: hotel,
        },
      },
      {
        $lookup: {
          from: 'roombookings',
          let: {
            roomId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$room', '$$roomId'],
                    },
                    {
                      $lte: ['$checkIn', new Date(endDate)],
                    },
                    {
                      $gte: ['$checkOut', new Date(startDate)],
                    },
                  ],
                },
              },
            },
            {
              $sort: {
                checkIn: 1,
              },
            },
          ],
          as: 'bookings',
        },
      },
      {
        $lookup: {
          from: 'roomtypes',
          localField: 'type',
          foreignField: '_id',
          as: 'type',
        },
      },
      {
        $unwind: '$type',
      },
      {
        $project: {
          _id: 1,
          number: 1,
          'type.title': 1,
          'type.rent': 1,
          'bookings._id': 1,
          'bookings.rent': 1,
          'bookings.booking': 1,
          'bookings.discount': 1,
          'bookings.checkIn': 1,
          'bookings.checkOut': 1,
          'bookings.status': 1,
        },
      },
      {
        $sort: {
          number: 1,
        },
      },
    ]);
  }

  findOne(id: ObjectId) {
    return this.roomModel.findById(id);
  }

  async update(id: ObjectId, updateRoomInput: UpdateRoomInput) {
    const updatedRoom = await this.roomModel.findByIdAndUpdate(
      id,
      { $set: updateRoomInput },
      { new: true },
    );
    return updatedRoom;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
