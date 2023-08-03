import { Module } from '@nestjs/common';
import { HotelsResolver } from './hotels.resolver';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  providers: [HotelsResolver, HotelsService],
})
export class HotelsModule {}
