import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateRoomTypeInput,
  RoomTypeFilterInput,
  UpdateRoomTypeInput,
} from '../dto/room-type.input';
import { RoomType, RoomTypeDocument } from '../schemas/roomtype.schema';

@Injectable()
export class RoomTypesService {
  constructor(
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
  ) {}
  create(createRoomInput: CreateRoomTypeInput) {
    return this.roomTypeModel.create(createRoomInput);
  }

  findAll(filter?: RoomTypeFilterInput) {
    return this.roomTypeModel.find(filter);
  }

  findOne(id: Types.ObjectId) {
    return this.roomTypeModel.findById(id);
  }

  async update(id: Types.ObjectId, updateRoomTypeInput: UpdateRoomTypeInput) {
    return this.roomTypeModel.findByIdAndUpdate(id, updateRoomTypeInput, {
      new: true,
    });
  }
}
