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
              $lookup: {
                from: 'transactions',
                let: {
                  bookingId: '$booking',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$booking', '$$bookingId'],
                      },
                    },
                  },
                  {
                    $group: {
                      _id: '$booking',
                      bookingPayment: {
                        $sum: '$amount',
                      },
                    },
                  },
                ],
                as: 'paymentDetails',
              },
            },
            {
              $lookup: {
                from: 'roombookings',
                let: {
                  booking: '$booking',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$booking', '$$booking'],
                      },
                    },
                  },
                  {
                    $group: {
                      _id: '$booking',
                      bookingRent: {
                        $sum: '$rent',
                      },
                    },
                  },
                ],
                as: 'bookingDetails',
              },
            },
            {
              $addFields: {
                bookingPayment: {
                  $ifNull: [
                    {
                      $arrayElemAt: ['$paymentDetails.bookingPayment', 0],
                    },
                    0,
                  ],
                },
                bookingRent: {
                  $ifNull: [
                    {
                      $arrayElemAt: ['$bookingDetails.bookingRent', 0],
                    },
                    0,
                  ],
                },
              },
            },
            {
              $addFields: {
                bookingDue: {
                  $cond: {
                    if: {
                      $eq: ['$bookingPayment', 0],
                    },
                    then: '$bookingRent',
                    else: {
                      $subtract: ['$bookingRent', '$bookingPayment'],
                    },
                  },
                },
              },
            },
            {
              $project: {
                paymentDetails: 0,
                bookingDetails: 0,
              },
            },
            {
              $sort: {
                checkIn: 1,
              },
            },
          ],
          as: 'roombookings',
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
          'roombookings.room': 0,
          'roombookings.hotel': 0,
          'roombookings.createdAt': 0,
          'roombookings.updatedAt': 0,
          'roombookings.__v': 0,
        },
      },
      {
        $sort: {
          position: 1,
        },
      },
      {
        $group: {
          _id: '$floor',
          rooms: {
            $push: {
              _id: '$_id',
              number: '$number',
              type: '$type',
              floor: '$floor',
              position: '$position',
              roombookings: '$roombookings',
            },
          },
        },
      },
      {
        $project: {
          floor: '$_id',
          rooms: 1,
          _id: 0,
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
