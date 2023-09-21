import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BookingsService } from 'src/bookings/bookings.service';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilter,
} from './dto/transaction.input';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly bookingService: BookingsService,
  ) {}

  async create(createTransactionInput: CreateTransactionInput) {
    const booking = await this.bookingService.findOne(
      createTransactionInput.booking,
    );
    if (!booking) {
      throw new BadRequestException(
        `Booking with ID ${createTransactionInput.booking} not found`,
      );
    }

    return this.transactionModel.create(createTransactionInput);
  }

  findAll() {
    return this.transactionModel.find();
  }

  findOne(id: ObjectId) {
    return this.transactionModel.findById(id);
  }

  async findTransaction(transactionfilter: TransactionFilter) {
    const filter = {};

    if (transactionfilter.startDate) {
      filter['date'] = { $gte: transactionfilter.startDate };
    }
    if (transactionfilter.endDate) {
      filter['date'] = { $lte: transactionfilter.endDate };
    }

    return this.transactionModel.find(filter);
  }

  update(updateTransactionInput: UpdateTransactionInput) {
    return this.transactionModel.findByIdAndUpdate(
      updateTransactionInput._id,
      { $set: updateTransactionInput },
      { new: true },
    );
  }

  remove(id: ObjectId) {
    return this.transactionModel.findByIdAndDelete(id);
  }

  async removeAll(id: ObjectId) {
    const filter = {
      booking: id,
    };

    return this.transactionModel.deleteMany(filter);
  }

  async softDelete(id: ObjectId): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id);

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    transaction.deletedAt = new Date();

    return transaction.save();
  }

  async findByDateRange(
    hotelId: ObjectId,
    startDate: Date,
    endDate: Date,
    includeDeleted = false, // Default to not include deleted transactions
  ) {
    const query: any = {
      hotel: hotelId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (!includeDeleted) {
      query.deletedAt = null;
    }
    return this.transactionModel.find(query);
  }
}
