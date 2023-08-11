import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.transactionModel.findById(id);
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async findByDateRange(hotelId: ObjectId, startDate: Date, endDate: Date) {
    return this.transactionModel.find({
      hotel: hotelId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  }
}
