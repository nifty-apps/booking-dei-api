import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Maintenance, MaintenanceSchema } from './schema/maintenance.schema';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesResolver } from './maintenances.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Maintenance.name,
        schema: MaintenanceSchema,
      },
    ]),
  ],
  providers: [MaintenancesService, MaintenancesResolver],
  exports: [MaintenancesService],
})
export class MaintenancesModule {}
