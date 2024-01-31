import { Resolver } from '@nestjs/graphql';
import { MaintenancesService } from './maintenances.service';

@Resolver()
export class MaintenancesResolver {
  constructor(private readonly service: MaintenancesService) {}
}
