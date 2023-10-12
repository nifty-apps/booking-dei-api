import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
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

  @Query(() => Contact, { name: 'contact' })
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.contactsService.findOne(id);
  }

  @Mutation(() => Contact, {
    name: 'updateContact',
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
  })
  removeContact(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.contactsService.remove(id);
  }
}
