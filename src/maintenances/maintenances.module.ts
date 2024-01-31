import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Maintenance, MaintenanceSchema } from './schema/maintenance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Maintenance.name,
        schema: MaintenanceSchema,
      },
    ]),
  ],
  providers: [],
  exports: [],
})
export class MaintenancesModule {}
