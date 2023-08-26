import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsMongoId()
  _id: ObjectId;

  @Field(() => ID, { description: 'Contact who made the booking' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  })
  @IsMongoId()
  contact: ObjectId;

  @Field(() => ID, {
    nullable: true,
    description: 'Unique identifier for the booking',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null,
  })
  @IsMongoId()
  @IsOptional()
  booking: ObjectId | null;

  @Field(() => ID, { description: 'Hotel where the transaction were made' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  @IsMongoId()
  hotel: ObjectId;

  @Field({ description: 'Date of the transaction' })
  @Prop({ required: true })
  @IsDate()
  date: Date;

  @Field({ nullable: true, description: 'Is the transaction deleted' })
  @Prop({ type: Date, default: null })
  @IsDate()
  @IsOptional()
  deletedAt: Date | null;

  @Field(() => TransactionCategory, {
    nullable: true,
    description: 'Type of the transaction',
  })
  @Prop({ required: true, enum: TransactionCategory })
  @IsEnum(TransactionCategory)
  category: TransactionCategory;

  @Field(() => TransactionSubCategory, {
    nullable: true,
    description: 'Sub Category of the transaction',
  })
  @Prop({ enum: TransactionSubCategory })
  @IsOptional()
  @IsEnum(TransactionSubCategory)
  subCategory: TransactionSubCategory;

  @Field(() => TransactionMethod, { description: 'Method of the transaction' })
  @Prop({ required: true, enum: TransactionMethod })
  @IsEnum(TransactionMethod)
  method: TransactionMethod;

  @Field({ nullable: true, description: 'Description of the transaction' })
  @Prop()
  @IsString()
  @IsOptional()
  description: string;

  @Field({ description: 'Amount of the transaction' })
  @Prop({ required: true })
  @IsNumber()
  amount: number;
}

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
