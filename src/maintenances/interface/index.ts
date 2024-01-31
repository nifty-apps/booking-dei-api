import { Types } from 'mongoose';

export interface AssessmentInputFields {
  hotel: Types.ObjectId;
  room: Types.ObjectId;
  booking: Types.ObjectId;
  issuedAt?: Date;
}
