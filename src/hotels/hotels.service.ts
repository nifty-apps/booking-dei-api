import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateHotelInput, UpdateHotelInput } from './dto/hotel.input';
import { Hotel, HotelDocument } from './schemas/hotel.schemas';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}
  create(createHotelInput: CreateHotelInput) {
    return this.hotelModel.create(createHotelInput);
  }

  findAll() {
    return this.hotelModel.find();
  }

  findOne(id: Types.ObjectId) {
    return this.hotelModel.findById(id);
  }

  async update(id: Types.ObjectId, updateHotelInput: UpdateHotelInput) {
    return this.hotelModel.findByIdAndUpdate(id, updateHotelInput, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
