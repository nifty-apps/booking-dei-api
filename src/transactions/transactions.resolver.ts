import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
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
import { TransactionFilter } from './dto/transaction-filter.input';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from './dto/transaction.input';
import { Transaction } from './schemas/transaction.schema';
import { TransactionsService } from './transactions.service';

@Resolver(() => Transaction)
@UseGuards(JwtAuthGuard)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly contactsService: ContactsService,
  ) {}

  @Mutation(() => Transaction, {
    name: 'createTransaction',
    description: 'Create transaction',
  })
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.transactionsService.create(createTransactionInput);
  }

  @Query(() => [Transaction], {
    name: 'transactions',
    description: 'Find all transactions',
  })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(() => [Transaction], {
    name: 'activeTransactions',
    description: 'Find all active transactions',
  })
  findActiveTransactions() {
    return this.transactionsService.findActiveTransactions();
  }

  @Query(() => Transaction, {
    name: 'transaction',
    description: 'Find transaction by ID',
  })
  findOne(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.transactionsService.findOne(id);
  }

  @Query(() => [Transaction], {
    name: 'transactionByFilter',
    description: 'Find Transactions by filter(s)',
  })
  findTransaction(
    @Args('transactionFilter') transactionFilter: TransactionFilter,
  ) {
    return this.transactionsService.findTransaction(transactionFilter);
  }

  @Mutation(() => Transaction, {
    name: 'updateTransaction',
    description: 'Update transaction',
  })
  async updateTransaction(
    @Args('id', { type: () => ID }) id: ObjectId,
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.transactionsService.update(id, updateTransactionInput);
  }

  @Mutation(() => Transaction, {
    name: 'removeTransaction',
    description: 'Delete transaction by ID',
  })
  removeTransaction(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.transactionsService.remove(id);
  }

  @Mutation(() => Transaction, {
    name: 'softDeleteTransaction',
    description: 'Soft delete transaction by ID',
  })
  softDeleteTransaction(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.transactionsService.softDelete(id);
  }

  @Query(() => [Transaction], {
    name: 'transactionsByDateRange',
    description: 'Find transactions by date range',
  })
  findByDateRange(
    @Args('hotelId', { type: () => ID }) hotelId: ObjectId,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
    @Args('includeDeleted', { type: () => Boolean, nullable: true })
    includeDeleted: boolean,
  ) {
    return this.transactionsService.findByDateRange(
      hotelId,
      new Date(startDate),
      new Date(endDate),
      includeDeleted,
    );
  }

  //TODO: Optimize this query with populate
  @ResolveField('contact', () => Contact)
  getContact(@Parent() transaction: Transaction) {
    return this.contactsService.findOne(transaction.contact);
  }
}
