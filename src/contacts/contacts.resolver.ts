import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContactsService } from './contacts.service';
import {
  ContactFilterInput,
  CreateContactInput,
  UpdateContactInput,
} from './dto/contact.input';
import { Contact } from './schemas/contact.schema';

@Resolver(() => Contact)
@UseGuards(JwtAuthGuard)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact, {
    name: 'createContact',
    description: 'Create contact',
  })
  createContact(
    @Args('createContactInput') createContactInput: CreateContactInput,
  ) {
    return this.contactsService.create(createContactInput);
  }

  @Query(() => [Contact], { name: 'contacts' })
  findAll(@Args('filter') filter: ContactFilterInput) {
    return this.contactsService.findAll(filter);
  }

  @Query(() => Contact, { name: 'contact', description: 'Find contact by ID' })
  findOne(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.contactsService.findOne(id);
  }

  @Mutation(() => Contact, {
    name: 'updateContact',
    description: 'Update contact',
  })
  updateContact(
    @Args('updateContactInput') updateContactInput: UpdateContactInput,
  ) {
    return this.contactsService.update(
      updateContactInput._id,
      updateContactInput,
    );
  }

  @Mutation(() => Contact, {
    name: 'removeContact',
    description: 'Delete contact by ID',
  })
  removeContact(@Args('id', { type: () => ID }) id: ObjectId) {
    return this.contactsService.remove(id);
  }
}
