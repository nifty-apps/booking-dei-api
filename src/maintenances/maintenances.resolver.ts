import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { Types } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  AssessmentFilter,
  AssessmentIdentifier,
  ReviewAssessmentInput,
  UpdateAssessmentInput,
} from './dtos/assessment.input';
import { MaintenancesService } from './maintenances.service';
import { Maintenance } from './schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/***************************************************************************/
/* I did find that there is no role guard or permission guard  implemented */
/* in this project yet so I just focused on my tasks and put the remaining */
/* task in TODO                                                            */
/***************************************************************************/

@Resolver(() => Maintenance)
@UseGuards(JwtAuthGuard)
export class MaintenancesResolver {
  constructor(private readonly service: MaintenancesService) {}

  // TODO: Add Role guard decorator for role admin
  // and Permission guard decorator for maintenance update
  @Mutation(() => Maintenance, { name: 'updateAssessment' })
  updateAssessment(
    @Args('updateAssessmentInput') update: UpdateAssessmentInput,
  ) {
    try {
      return this.service.updateAssessment(update);
    } catch (err) {
      if (err.name === 'ApplicationError') {
        throw new UserInputError(err.message);
      }
      throw err;
    }
  }

  // TODO: Add Role guard decorator for role staff
  // and Permission guard decorator for review assessment
  @Mutation(() => Maintenance, { name: 'reviewAssessment' })
  async reviewAssessment(
    @CurrentUser('_id') userId: Types.ObjectId,
    @Args('reviewAssessmentInput') update: ReviewAssessmentInput,
  ) {
    return await this.service.reviewAssessment(userId, update);
  }

  // TODO: Add Role guard decorator for role staff
  // and Permission guard decorator for resolve maintenance
  @Mutation(() => Maintenance, { name: 'resolveMaintenance' })
  resolveMaintenance(
    @CurrentUser('_id') userId: Types.ObjectId,
    @Args('assessmentIdentifier') input: AssessmentIdentifier,
  ) {
    return this.service.resolveMaintenance(userId, input);
  }

  // TODO: Add Role guard decorator for role staff
  // and Permission guard decorator for clean room
  @Mutation(() => Maintenance, { name: 'cleanRoom' })
  cleanRoom(
    @CurrentUser('_id') userId: Types.ObjectId,
    @Args('assessmentIdentifier') input: AssessmentIdentifier,
  ) {
    return this.service.cleanRoom(userId, input);
  }

  // TODO: Add Role guard decorator for role admin
  // and Permission guard decorator for remove maintenance
  @Mutation(() => Maintenance, { name: 'removeAssessment' })
  remove(@Args('assessmentIdentifier') input: AssessmentIdentifier) {
    return this.service.removeAssessment(input);
  }

  @Query(() => Maintenance, { name: 'maintenance' })
  findOne(@Args('assessmentIdentifier') input: AssessmentIdentifier) {
    return this.service.getAssessment(input);
  }

  @Query(() => [Maintenance], { name: 'maintenances' })
  findAll(@Args('assessmentIdentifier') input: AssessmentFilter) {
    return this.service.getAllAssessment(input);
  }
}
