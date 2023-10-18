import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingLogFilter } from './dto/booking-log.input';
import { BookingLog, BookingLogDocument } from './schemas/booking-log.schema';

@Injectable()
export class BookingLogService {
  constructor(
    @InjectModel(BookingLog.name)
    private bookingLogModel: Model<BookingLogDocument>,
  ) {}

  findAll(filter: BookingLogFilter) {
    return this.bookingLogModel.find(filter);
  }
}
