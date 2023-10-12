import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  findRoomBookingsOverview(
    hotel: Types.ObjectId,
    startDate: Date,
    endDate: Date,
  ) {
    return this.roomModel.aggregate([
      {
        $match: {
          hotel: hotel,
        },
      },
      {
        $lookup: {
          from: 'roombookings',
          let: { roomId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$room', '$$roomId'] },
                    { $ne: ['$status', 'CANCELLED'] },
                    { $lte: ['$checkIn', new Date(endDate)] },
                    { $gte: ['$checkOut', new Date(startDate)] },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: 'bookings',
                let: { bookingId: '$booking' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$bookingId'],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: 'contacts',
                      localField: 'customer',
                      foreignField: '_id',
                      as: 'customerInfo',
                    },
                  },
                  {
                    $unwind: '$customerInfo',
                  },
                  {
                    $project: {
                      customerName: '$customerInfo.name',
                    },
                  },
                ],
                as: 'customer',
              },
            },
            {
              $addFields: {
                bookingCustomer: {
                  $ifNull: [
                    {
                      $arrayElemAt: ['$customer.customerName', 0],
                    },
                    null,
                  ],
                },
              },
            },
            {
              $project: {
                customer: 0,
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

  findRoomBookingsFinancials(
    hotel: Types.ObjectId,
    startDate: Date,
    endDate: Date,
  ) {
    return this.roomModel.aggregate([
      {
        $match: {
          hotel: hotel,
        },
      },
      {
        $lookup: {
          from: 'roombookings',
          let: { roomId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$room', '$$roomId'] },
                    { $ne: ['$status', 'CANCELLED'] },
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
                let: { bookingId: '$booking' },
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
                let: { booking: '$booking' },
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
              $lookup: {
                from: 'bookings',
                let: { bookingId: '$booking' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$bookingId'],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: 'contacts',
                      localField: 'customer',
                      foreignField: '_id',
                      as: 'customerInfo',
                    },
                  },
                  {
                    $unwind: '$customerInfo',
                  },
                  {
                    $group: {
                      _id: '$_id',
                      bookingPayment: {
                        $sum: '$amount',
                      },
                      customerName: {
                        $first: '$customerInfo.name',
                      },
                    },
                  },
                ],
                as: 'customer',
              },
            },
            {
              $addFields: {
                bookingCustomer: {
                  $ifNull: [
                    {
                      $arrayElemAt: ['$customer.customerName', 0],
                    },
                    null,
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
                bookingPayment: {
                  $ifNull: [
                    {
                      $arrayElemAt: ['$paymentDetails.bookingPayment', 0],
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
                customer: 0,
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
          'roombookings.rent': 0,
          'roombookings.discount': 0,
          'roombookings.extraBed': 0,
          'roombookings.extraBreakfast': 0,
          'roombookings.createdAt': 0,
          'roombookings.updatedAt': 0,
          'roombookings.__v': 0,
        },
      },
      {
        $sort: {
          number: 1,
        },
      },
    ]);
  }

  findOne(id: Types.ObjectId) {
    return this.roomModel.findById(id);
  }

  async update(id: Types.ObjectId, updateRoomInput: UpdateRoomInput) {
    const updatedRoom = await this.roomModel.findByIdAndUpdate(
      id,
      { $set: updateRoomInput },
      { new: true },
    );
    return updatedRoom;
  }

  remove(id: Types.ObjectId) {
    return this.roomModel.findByIdAndDelete(id);
  }
}
