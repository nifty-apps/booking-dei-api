import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTransactionInput } from './dto/create-transaction.input';
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

  findOne(id: number) {
    return this.transactionModel.findById(id);
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
