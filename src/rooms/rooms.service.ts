import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  CreateRoomInput,
  RoomFilterInput,
  UpdateRoomInput,
} from './dto/room.input';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  create(createRoomInput: CreateRoomInput) {
    return this.roomModel.create(createRoomInput);
  }

  async findAll(query?: RoomFilterInput) {
    return this.roomModel.find(query);
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
          'type._id': 0,
          'type.hotel': 0,
          'bookings.room': 0,
          'bookings.hotel': 0,
          'bookings.createdAt': 0,
          'bookings.updatedAt': 0,
          'bookings.__v': 0,
        },
      },
      {
        $sort: {
          position: 1, // Then by position within each floor
        },
      },
      {
        $group: {
          _id: '$floor',
          // Group by floor
          rooms: {
            $push: {
              // For each grouped floor, push the room info into an array
              _id: '$_id',
              number: '$number',
              type: '$type',
              floor: '$floor',
              position: '$position',
              bookings: '$bookings',
            },
          },
        },
      },
      {
        $project: {
          floor: '$_id',
          rooms: 1,
          _id: 0, // Exclude the _id field in the output
        },
      },
      {
        $sort: {
          floor: 1,
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

  remove(id: ObjectId) {
    return this.roomModel.findByIdAndDelete(id);
  }
}
