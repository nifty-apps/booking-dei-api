import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomTypesResolver } from './resolvers/room-types.resolver';
import { RoomsResolver } from './resolvers/rooms.resolver';
import { Room, RoomSchema } from './schemas/room.schema';
import { RoomType, RoomTypeSchema } from './schemas/roomtype.schema';
import { RoomTypesService } from './services/room-types.service';
import { RoomsService } from './services/rooms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
    ]),
  ],
  providers: [RoomsResolver, RoomTypesResolver, RoomsService, RoomTypesService],
})
export class RoomsModule {}
