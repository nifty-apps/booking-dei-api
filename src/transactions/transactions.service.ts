import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { TransactionFilter } from './dto/transactionfilter.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  create(createTransactionInput: CreateTransactionInput) {
    return this.transactionModel.create(createTransactionInput);
  }

  findAll() {
    return this.transactionModel.find();
  }

  findActiveTransactions() {
    return this.transactionModel.find({ deletedAt: null });
  }

  findOne(id: ObjectId) {
    return this.transactionModel.findById(id);
  }

  async findTransaction(transactionfilter: TransactionFilter) {
    const filter = {};
    if (transactionfilter.hotelId) {
      filter['hotel'] = transactionfilter.hotelId;
    }
    if (transactionfilter.contactId) {
      filter['contact'] = transactionfilter.contactId;
    }
    if (transactionfilter.bookingId) {
      filter['booking'] = transactionfilter.bookingId;
    }
    if (transactionfilter.startDate) {
      filter['date'] = { $gte: transactionfilter.startDate };
    }
    if (transactionfilter.endDate) {
      filter['date'] = { $lte: transactionfilter.endDate };
    }
    if (transactionfilter.deletedAt) {
      filter['deletedAt'] = transactionfilter.deletedAt;
    }
    if (transactionfilter.method) {
      filter['method'] = transactionfilter.method;
    }
    if (transactionfilter.category) {
      filter['category'] = transactionfilter.category;
    }
    if (transactionfilter.subCategory) {
      filter['subCategory'] = transactionfilter.subCategory;
    }

    return this.transactionModel.find(filter);
  }

  update(id: ObjectId, updateTransactionInput: UpdateTransactionInput) {
    return this.transactionModel.findByIdAndUpdate(
      id,
      { $set: updateTransactionInput },
      { new: true },
    );
  }

  remove(id: ObjectId) {
    return this.transactionModel.findByIdAndDelete(id);
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
