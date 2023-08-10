import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export enum TransactionCategory {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum TransactionSubCategory {
  SALARY = 'SALARY',
  ELECTRICITY = 'ELECTRICITY',
  WATER = 'WATER',
  RENT = 'RENT',
  OTHEREXPENSE = 'OTHEREXPENSE',
  ROOMRENT = 'ROOMRENT',
}

export enum TransactionMethod {
  CASH = 'CASH',
  BANK = 'BANK',
  BKASH = 'BKASH',
}

// Register the enum with GraphQL
registerEnumType(TransactionCategory, {
  name: 'TransactionType', // this one is mandatory
  description: 'Type of the transaction', // this one is optional
});

registerEnumType(TransactionMethod, {
  name: 'TransactionMethod',
  description: 'Method of the transaction',
});

registerEnumType(TransactionSubCategory, {
  name: 'TransactionSubCategory',
  description: 'Sub Category of the transaction',
});

@ObjectType()
@Schema({ timestamps: true })
export class Transaction {
  @Field(() => ID, { description: 'Unique identifier for the transaction' })
  _id: ObjectId;

  @Field(() => ID, { description: 'Contact who made the booking' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  })
  contact: ObjectId;

  @Field(() => ID, {
    nullable: true,
    description: 'Unique identifier for the booking',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  })
  booking?: ObjectId;

  @Field(() => ID, { description: 'Hotel where the transaction were made' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: ObjectId;

  @Field({ description: 'Date of the transaction' })
  @Prop({ required: true })
  date: Date;

  @Field(() => TransactionCategory, {
    nullable: true,
    description: 'Type of the transaction',
  })
  @Prop({ required: true, enum: TransactionCategory })
  category: TransactionCategory;

  @Field(() => TransactionSubCategory, {
    nullable: true,
    description: 'Sub Category of the transaction',
  })
  @Prop({ enum: TransactionSubCategory })
  subCategory: TransactionSubCategory;

  @Field(() => TransactionMethod, { description: 'Method of the transaction' })
  @Prop({ required: true, enum: TransactionMethod })
  method: TransactionMethod;

  @Field({ nullable: true, description: 'Description of the transaction' })
  @Prop()
  description: string;

  @Field({ description: 'Amount of the transaction' })
  @Prop({ required: true })
  amount: number;
}

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
