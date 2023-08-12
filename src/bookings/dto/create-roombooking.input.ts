import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { RoomBookingStatus } from '../schemas/roombooking.schema';

@InputType()
export class CreateRoomBookingInput {
  @Field(() => ID, { description: 'Room where the booking were generated' })
  @IsMongoId()
  room: ObjectId;

  @Field({ description: 'Check-in date of the Room booking' })
  @IsDate()
  checkIn: Date;

  @Field({ description: 'Check-out date of the Room booking' })
  @IsDate()
  checkOut: Date;

  @Field({ description: 'Room rent for the booking' })
  @IsNumber()
  rent: number;

  @Field({ description: 'Discount for the booking' })
  @IsNumber()
  discount: number;

  @Field({ description: 'Extra bed for the booking' })
  @IsBoolean()
  extraBed: boolean;

  @Field({ description: 'Extra breakfast for the booking' })
  @IsBoolean()
  extraBreakfast: boolean;

  @Field(() => RoomBookingStatus, {
    nullable: true, //TODO: for drop down enum in postman
    description: 'Room booking status of the Room booking',
  })
  @IsEnum(RoomBookingStatus)
  status: RoomBookingStatus;
}
