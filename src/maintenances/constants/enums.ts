import { registerEnumType } from '@nestjs/graphql';

export enum MaintenanceStatus {
  NONE = 'NONE',
  REQUIRED = 'REQUIRED',
  RESOLVED = 'RESOLVED',
}
registerEnumType(MaintenanceStatus, {
  name: 'MaintenanceStatus',
  description: 'Maintenance status of room',
});

export enum CleaningStatus {
  NONE = 'NONE',
  REQUIRED = 'REQUIRED',
  CLEANED = 'CLEANED',
}

registerEnumType(CleaningStatus, {
  name: 'CleaningStatus',
  description: 'Cleaning Status of room',
});
