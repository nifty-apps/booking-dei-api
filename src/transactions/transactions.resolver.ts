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
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilter,
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
  })
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.transactionsService.create(createTransactionInput);
  }

  @Query(() => [Transaction], {
    name: 'transactions',
  })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(() => Transaction, {
    name: 'transaction',
  })
  findOne(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.transactionsService.findOne(id);
  }

  @Query(() => [Transaction], {
    name: 'transactionByFilter',
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
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.transactionsService.update(updateTransactionInput);
  }

  @Mutation(() => Transaction, {
    name: 'removeTransaction',
  })
  removeTransaction(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.transactionsService.remove(id);
  }

  @Mutation(() => Transaction, {
    name: 'softDeleteTransaction',
  })
  softDeleteTransaction(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.transactionsService.softDelete(id);
  }

  @Query(() => [Transaction], {
    name: 'transactionsByDateRange',
  })
  findByDateRange(
    @Args('hotel', { type: () => ID }) hotel: ObjectId,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
    @Args('includeDeleted', { type: () => Boolean, nullable: true })
    includeDeleted: boolean,
  ) {
    return this.transactionsService.findByDateRange(
      hotel,
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
