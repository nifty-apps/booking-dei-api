import { Types } from 'mongoose';
import { CleaningStatus, MaintenanceStatus } from '../constants';

export interface AssessmentUpdate {
  _id: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;

  maintenanceRemark?: string;
  maintenanceStatus?: MaintenanceStatus;
  resolvedBy?: Types.ObjectId;
  resolvedAt?: Date;

  cleaningStatus?: CleaningStatus;
  cleanedAt?: Date;
  cleanedBy?: Types.ObjectId;
}
