import { Types } from 'mongoose';

export interface CheckoutEvent {
  hotel: Types.ObjectId;
  room: Types.ObjectId;
  booking: Types.ObjectId;
  checkoutAt: Date;
}
