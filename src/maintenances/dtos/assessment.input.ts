import { Field, ID, InputType, PartialType, PickType } from '@nestjs/graphql';
import { Maintenance } from '../schema';
import { CleaningStatus, MaintenanceStatus } from '../constants';
import { IsIn, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class AssessmentIdentifier extends PickType(
  Maintenance,
  ['_id', 'hotel'],
  InputType,
) {}

@InputType()
export class AssessmentFilter extends PartialType(Maintenance, InputType) {}

/* Will be used by admin */
@InputType()
export class UpdateAssessmentInput extends PartialType(
  PickType(
    Maintenance,
    [
      'reviewedBy',
      'reviewedAt',

      'maintenanceRemark',
      'maintenanceStatus',
      'resolvedBy',
      'resolvedAt',

      'cleaningStatus',
      'cleanedAt',
      'cleanedBy',
    ],
    InputType,
  ),
) {
  @Field(() => ID)
  @IsMongoId()
  _id: Types.ObjectId;

  @Field(() => ID)
  @IsMongoId()
  hotel: Types.ObjectId;
}

/* Will be used by house keeper (staff) */
@InputType()
export class ReviewAssessmentInput extends PickType(
  Maintenance,
  ['_id', 'hotel', 'maintenanceRemark'],
  InputType,
) {
  @Field(() => MaintenanceStatus, {
    description: 'Maintenance Status of the room',
  })
  @IsIn([MaintenanceStatus.NONE, MaintenanceStatus.REQUIRED])
  maintenanceStatus: MaintenanceStatus;

  @Field(() => CleaningStatus, {
    description: 'Cleaning status of the room',
  })
  @IsIn([CleaningStatus.NONE, CleaningStatus.REQUIRED])
  cleaningStatus: CleaningStatus;
}
