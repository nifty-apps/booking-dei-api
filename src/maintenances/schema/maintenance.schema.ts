import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { CleaningStatus, MaintenanceStatus } from '../constants/enums';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export type MaintenanceDocument = HydratedDocument<Maintenance>;

@ObjectType()
@Schema({ timestamps: true })
export class Maintenance {
  @Field(() => ID, {
    description: 'Unique identifier for Maintenance and assessment record',
  })
  @IsMongoId()
  _id: Types.ObjectId;

  @Field(() => ID, {
    description: 'Hotel of the room that requires maintenance assessment',
  })
  @IsMongoId()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Hotel',
    required: true,
    immutable: true,
    index: true,
  })
  hotel: Types.ObjectId;

  @Field(() => ID, {
    description: 'Room that requires maintenance assessment',
  })
  @IsMongoId()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Room',
    required: true,
    immutable: true,
    index: true,
  })
  room: Types.ObjectId;

  @Field(() => ID, {
    description: 'Booking that triggered maintenance assessment',
  })
  @IsMongoId()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Booking',
    required: true,
    immutable: true,
  })
  booking: Types.ObjectId;

  @Field({
    description: 'Indicates the time of trigger',
  })
  @IsDate()
  @Prop({
    required: true,
    default: () => Date.now(),
    immutable: true,
    index: true,
  })
  issuedAt: Date;

  /*****************/
  /*  R e v i e w  */
  /*****************/

  @Field(() => ID, {
    description: 'The user who examined the room for maintenance',
    nullable: true,
  })
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  reviewedBy?: Types.ObjectId;

  @Field({
    description: 'The time when user examined the room for maintenance',
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  @Prop({
    type: Date,
    index: true,
  })
  reviewedAt?: Date;

  /***************************/
  /*  M a i n t e n a n c e  */
  /***************************/

  @Field(() => MaintenanceStatus, {
    description: 'Current maintenance status',
  })
  @IsEnum(MaintenanceStatus)
  @Prop({
    type: String,
    enum: MaintenanceStatus,
    default: MaintenanceStatus.NONE,
  })
  maintenanceStatus: MaintenanceStatus;

  @Field({
    description: 'Remarks given by reviewer for maintenance',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Prop({
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 255,
  })
  maintenanceRemark?: string;

  @Field(() => ID, {
    description: 'The user who resolved the maintenance issue',
    nullable: true,
  })
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  resolvedBy?: Types.ObjectId;

  @Field({
    description: 'The time when the maintenance issue is resolved',
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  @Prop({
    type: Date,
    index: true,
  })
  resolvedAt?: Date;

  /*********************/
  /*  C l e a n i n g  */
  /*********************/

  @Field(() => CleaningStatus, {
    description: 'Current cleaning status of the room',
  })
  @IsEnum(CleaningStatus)
  @Prop({
    type: String,
    enum: CleaningStatus,
    default: CleaningStatus.NONE,
  })
  cleaningStatus: CleaningStatus;

  @Field(() => ID, {
    description: 'The time when the room is cleaned',
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  @Prop({
    type: Date,
  })
  cleanedAt?: Date;

  @Field(() => ID, {
    description: 'The user who cleaned the room',
    nullable: true,
  })
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  cleanedBy?: Types.ObjectId;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
