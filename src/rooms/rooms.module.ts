import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';
import { RoomTypesService } from './roomtypes.service';
import { Room, RoomSchema } from './schemas/room.schema';
import { RoomType, RoomTypeSchema } from './schemas/roomtype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
    ]),
  ],
  providers: [RoomsResolver, RoomsService, RoomTypesService],
})
export class RoomsModule {}
