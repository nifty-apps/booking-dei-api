import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './schemas/contact.schema';

@Resolver(() => Contact)
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

  @Query(() => [Contact], {
    name: 'contacts',
    description: 'Find all contacts',
  })
  findAll() {
    return this.contactsService.findAll();
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
      updateContactInput.id,
      updateContactInput,
    );
  }

  @Mutation(() => Contact, {
    name: 'removeContact',
    description: 'Delete contact by ID',
  })
  removeContact(@Args('id', { type: () => Int }) id: number) {
    return this.contactsService.remove(id);
  }
}
