import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContactsService } from 'src/contacts/contacts.service';
import { Contact } from 'src/contacts/schemas/contact.schema';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Transaction } from './schemas/transaction.schema';
import { TransactionsService } from './transactions.service';

@Resolver(() => Transaction)
@UseGuards(JwtAuthGuard)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly contactsService: ContactsService,
  ) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.transactionsService.create(createTransactionInput);
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.transactionsService.update(
      updateTransactionInput.id,
      updateTransactionInput,
    );
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.remove(id);
  }

  @Query(() => [Transaction], { name: 'transactionsByDateRange' })
  findByDateRange(
    @Args('hotelId', { type: () => ID }) hotelId: ObjectId,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.transactionsService.findByDateRange(
      hotelId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  //TODO: Optimize this query with populate
  @ResolveField('contact', () => Contact)
  getContact(@Parent() transaction: Transaction) {
    return this.contactsService.findOne(transaction.contact);
  }
}
