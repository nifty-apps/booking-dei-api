import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from 'src/hotels/schemas/hotel.schemas';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  providers: [CustomersResolver, CustomersService],
})
export class CustomersModule {}
