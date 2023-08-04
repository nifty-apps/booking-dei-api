import { registerEnumType } from '@nestjs/graphql';

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PARTIAL_PAID = 'partial paid',
  PAID = 'paid',
}

// Register the enum with GraphQL
registerEnumType(PaymentStatus, {
  name: 'PaymentStatus', // this one is mandatory
  description: 'Payment status for a booking', // this one is optional
});
