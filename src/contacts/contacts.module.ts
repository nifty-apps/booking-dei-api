import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from 'src/hotels/schemas/hotel.schemas';
import { ContactsResolver } from './contacts.resolver';
import { ContactsService } from './contacts.service';
import { Contact, ContactSchema } from './schemas/contact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  providers: [ContactsResolver, ContactsService],
})
export class ContactsModule {}
