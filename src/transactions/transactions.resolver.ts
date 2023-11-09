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
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ContactsService } from 'src/contacts/contacts.service';
import { Contact } from 'src/contacts/schemas/contact.schema';
import {
  CreateTransactionInput,
  TransactionFilter,
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
  })
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
    @CurrentUser('_id') user: Types.ObjectId,
  ) {
    return this.transactionsService.create(createTransactionInput, user);
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
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
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

  //TODO: remove this query by using filter query
  @Mutation(() => Transaction, {
    name: 'removeTransaction',
  })
  removeTransaction(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.transactionsService.remove(id);
  }
  //TODO: remove this query by using filter query
  @Mutation(() => Transaction, {
    name: 'softDeleteTransaction',
  })
  softDeleteTransaction(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.transactionsService.softDelete(id);
  }
  //TODO: remove this query by using filter query

  @Query(() => [Transaction], {
    name: 'transactionsByDateRange',
  })
  findByDateRange(
    @Args('hotel', { type: () => ID }) hotel: Types.ObjectId,
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
