import { Field, InputType, PickType } from '@nestjs/graphql';
import { Maintenance } from '../schema';
import { CleaningStatus, MaintenanceStatus } from '../constants';
import { IsIn } from 'class-validator';

/* Will be used by admin */
@InputType()
export class UpdateAssessment extends PickType(Maintenance, [
  '_id',

  'reviewedBy',
  'reviewedAt',

  'maintenanceRemark',
  'maintenanceStatus',
  'resolvedBy',
  'resolvedAt',

  'cleaningStatus',
  'cleanedAt',
  'cleanedBy',
]) {}

/* Will be used by house keeper (staff) */
@InputType()
export class ReviewAssessment extends PickType(Maintenance, [
  '_id',
  'reviewedBy',
  'reviewedAt',
  'maintenanceRemark',
]) {
  @Field(() => MaintenanceStatus, {
    description: 'Maintenance Status of the room',
  })
  @IsIn([MaintenanceStatus.NONE, MaintenanceStatus.REQUIRED])
  maintenanceStatus: MaintenanceStatus;

  @Field(() => MaintenanceStatus, {
    description: 'Cleaning status of the room',
  })
  @IsIn([CleaningStatus.NONE, CleaningStatus.REQUIRED])
  cleaningStatus: MaintenanceStatus;
}

// Used by house keeper (staff) only
@InputType()
export class ResolveMaintenanceIssueInput extends PickType(Maintenance, [
  '_id',
]) {}

// Used by house keeper (staff) only
@InputType()
export class CompleteCleaningAssignmentInput extends PickType(Maintenance, [
  '_id',
]) {}
