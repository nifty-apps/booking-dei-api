import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsService } from 'src/contacts/contacts.service';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: 'Contact', schema: TransactionSchema },
    ]),
  ],
  providers: [TransactionsResolver, TransactionsService, ContactsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
