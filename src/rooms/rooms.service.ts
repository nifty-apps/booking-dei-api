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

  findAll() {
    return this.roomModel.find();
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
