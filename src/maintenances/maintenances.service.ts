import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Maintenance } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { AssessmentInputFields } from './interface';

@Injectable()
export class MaintenancesService {
  constructor(
    @InjectModel(Maintenance.name) private model: Model<Maintenance>,
  ) {}

  private async createAssessment(input: AssessmentInputFields) {
    return await this.model.create({
      ...input,
      issuedAt: input.issuedAt ?? Date.now(),
    });
  }
}
