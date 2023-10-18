import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { BookingLog } from '../schemas/booking-log.schema';

@InputType()
export class CreateBookingLogInput extends OmitType(
  BookingLog,
  ['_id'],
  InputType,
) {}

@InputType()
export class UpdateBookingInput extends PartialType(BookingLog, InputType) {}

@InputType()
export class BookingLogFilter extends PartialType(BookingLog, InputType) {}
