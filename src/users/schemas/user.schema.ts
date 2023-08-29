import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

enum UserType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

registerEnumType(UserType, {
  name: 'UserType',
  description: 'Type of the user',
});

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  _id: ObjectId;

  @Field({ description: 'Name of the user' })
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true, description: 'Email of the user' })
  @Prop({ unique: true })
  email?: string;

  @Field({ description: 'Phone number of the user' })
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Field(() => [ID], { description: 'Hotels of the user' })
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Hotel',
  })
  hotels: ObjectId[];

  @Field(() => UserType, { description: 'Type of the user' })
  @Prop({ enum: UserType, required: true })
  type: UserType;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
