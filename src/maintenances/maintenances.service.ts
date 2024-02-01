import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Maintenance } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { CheckoutEvent } from './interface/checkout-event';
import { AssessmentUpdate } from './interface/assessment-updates';
import {
  AssessmentFilter,
  AssessmentIdentifier,
  ReviewAssessmentInput,
} from './dtos/assessment.input';
import { CleaningStatus, MaintenanceStatus } from './constants';

@Injectable()
export class MaintenancesService {
  constructor(
    @InjectModel(Maintenance.name) private model: Model<Maintenance>,
  ) {}

  public notifyCheckout(event: CheckoutEvent) {
    return this.model.create({
      ...event,
      issuedAt: event.checkoutAt ?? Date.now(),
    });
  }

  public async updateAssessment({ _id, ...update }: AssessmentUpdate) {
    const assessment = await this.model.findOneAndUpdate({ _id }, update, {
      new: true,
    });
    if (!assessment) {
      throw new NotFoundException('Assessment not found!');
    }
    return assessment;
  }

  public async removeAssessment(input: AssessmentIdentifier) {
    const assessment = await this.model.findOneAndRemove(input);
    if (!assessment) {
      throw new NotFoundException('Assessment not found!');
    }
    return assessment;
  }

  public async reviewAssessment(
    userId: Types.ObjectId,
    input: ReviewAssessmentInput,
  ) {
    const assessment = await this.getAssessment({
      _id: input._id,
      hotel: input.hotel,
    });

    if (assessment.reviewedAt) {
      throw new BadRequestException('Assessment is already reviewed!');
    }

    return await this.updateAssessment({
      ...input,
      reviewedAt: new Date(),
      reviewedBy: userId,
    });
  }

  public async cleanRoom(userId: Types.ObjectId, input: AssessmentIdentifier) {
    const assessment = await this.getAssessment(input);
    switch (assessment.cleaningStatus) {
      case CleaningStatus.CLEANED:
        throw new BadRequestException('Room is already cleaned!');
      case CleaningStatus.REQUIRED:
        return await this.updateAssessment({
          ...input,
          cleaningStatus: CleaningStatus.CLEANED,
          cleanedAt: new Date(),
          cleanedBy: userId,
        });
      default:
        throw new BadRequestException("Room doesn't require cleaning!");
    }
  }

  public async resolveMaintenance(
    userId: Types.ObjectId,
    input: AssessmentIdentifier,
  ) {
    const assessment = await this.getAssessment(input);
    switch (assessment.maintenanceStatus) {
      case MaintenanceStatus.RESOLVED:
        throw new BadRequestException('Maintenance is already completed!');
      case MaintenanceStatus.REQUIRED:
        return await this.updateAssessment({
          ...input,
          maintenanceStatus: MaintenanceStatus.RESOLVED,
          resolvedAt: new Date(),
          resolvedBy: userId,
        });
      default:
        throw new BadRequestException("Room doesn't require maintenance");
    }
  }

  public async getAssessment(input: AssessmentIdentifier) {
    const assessment = await this.model.findOne(input);
    if (!assessment) {
      throw new NotFoundException('Assessment not found!');
    }
    return assessment;
  }

  public async getAllAssessment(input: AssessmentFilter) {
    return await this.model.find(input);
  }
}
