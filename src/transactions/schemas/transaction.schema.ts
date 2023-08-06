import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export enum TransactionType {
  INCOME = 'INCOME',
  SALARY = 'SALARY',
  ELECTRICITY = 'ELECTRICITY',
  WATER = 'WATER',
  RENT = 'RENT',
  OTHEREXPENSE = 'OTHEREXPENSE',
}

export enum TransactionSource {
  CASH = 'CASH',
  BANK = 'BANK',
  BKASH = 'BKASH',
}

// maybe will be used later
// interface ITransaction {
//   type: TransactionType;
//   source: TransactionSource;
// }

// Register the enum with GraphQL
registerEnumType(TransactionType, {
  name: 'TransactionType', // this one is mandatory
  description: 'Type of the transaction', // this one is optional
});

registerEnumType(TransactionSource, {
  name: 'TransactionSource',
  description: 'Source of the transaction',
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

  @Field({ description: 'Amount of the transaction' })
  @Prop({ required: true })
  amount: number;

  @Field(() => TransactionType, { description: 'Type of the transaction' })
  @Prop({ required: true, enum: TransactionType })
  type: TransactionType;

  @Field(() => TransactionSource, { description: 'Source of the transaction' })
  @Prop({ required: true, enum: TransactionSource })
  source: TransactionSource;
}

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
