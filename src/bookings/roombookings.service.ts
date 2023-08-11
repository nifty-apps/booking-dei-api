import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { RoomType, RoomTypeDocument } from 'src/rooms/schemas/roomtype.schema';

@Injectable()
export class RoomTypesService {
  constructor(
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomTypeDocument>,
  ) {}
  // create(createRoomInput: CreateRoomInput) {
  //   return this.roomTypeModel.create(createRoomInput);
  // }

  findAll() {
    return this.roomTypeModel.find();
  }

  findOne(id: ObjectId) {
    return this.roomTypeModel.findById(id);
  }

  // update(id: number, updateRoomInput: UpdateRoomInput) {
  //   return `This action updates a #${id} room`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} room`;
  // }
}
