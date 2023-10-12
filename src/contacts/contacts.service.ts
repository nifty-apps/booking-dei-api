import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ContactFilterInput,
  CreateContactInput,
  UpdateContactInput,
} from './dto/contact.input';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactInput: CreateContactInput) {
    const query: any = {
      hotel: createContactInput.hotel,
      $or: [{ phone: createContactInput.phone }],
    };

    if (createContactInput.idNo && createContactInput.idType) {
      query['$or'].push({ idNo: createContactInput.idNo });
    }

    const contact = await this.contactModel.findOne(query);

    if (contact) {
      let errorMessage: string = null;
      if (
        createContactInput.idNo &&
        contact?.idNo === createContactInput.idNo &&
        contact?.phone === createContactInput.phone
      ) {
        errorMessage = 'Contact already exists with this NID and phone number';
      } else if (
        createContactInput.idNo &&
        contact?.idNo === createContactInput.idNo
      )
        errorMessage = 'Contact already exists with this NID';
      else if (contact?.phone === createContactInput.phone)
        errorMessage = 'Contact already exists with this phone number';
      throw new BadRequestException(errorMessage);
    }

    return this.contactModel.create(createContactInput);
  }

  async findAll(filter?: ContactFilterInput) {
    const query = {
      ...filter,
      name: { $regex: new RegExp(filter.name, 'i') },
      phone: { $regex: new RegExp(filter.phone, 'i') },
    };

    return this.contactModel.find(query);
  }

  findOne(id: Types.ObjectId) {
    return this.contactModel.findById(id);
  }

  async update(id: Types.ObjectId, updateContactInput: UpdateContactInput) {
    return this.contactModel.findByIdAndUpdate(id, updateContactInput, {
      new: true,
    });
  }

  remove(id: Types.ObjectId) {
    return this.contactModel.findByIdAndRemove(id);
  }
}
