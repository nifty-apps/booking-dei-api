import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { ContactsModule } from './contacts/contacts.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { MaintenancesModule } from './maintenances/maintenances.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
    }),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      path: '/api',
      autoSchemaFile: true,
    }),
    HotelsModule,
    RoomsModule,
    UsersModule,
    ContactsModule,
    BookingsModule,
    TransactionsModule,
    AuthModule,
    MaintenancesModule,
  ],
  providers: [],
})
export class AppModule {}
