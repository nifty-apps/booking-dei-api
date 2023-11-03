import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, ObjectId, SchemaTypes, Types } from 'mongoose';

export enum UserType {
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
  _id: Types.ObjectId;

  @Field({ description: 'Name of the user' })
  @Prop({ required: true })
  @IsString()
  name: string;

  @Field({ nullable: true, description: 'Email of the user' })
  @Prop({ unique: true })
  @IsString()
  @IsOptional()
  email?: string;

  @Field({ description: 'Phone number of the user' })
  @Prop({ required: true, unique: true })
  phone: string;

  @Field({ description: 'Password of the user' })
  @Prop({ required: true })
  password: string;

  @Field(() => [ID], { description: 'Hotels of the user' })
  @Prop({
    required: true,
    type: [SchemaTypes.ObjectId],
    ref: 'Hotel',
  })
  hotels: ObjectId[];

  @Field(() => UserType, { description: 'Type of the user' })
  @Prop({ enum: UserType, required: true })
  type: UserType;

  @Field({ nullable: true, description: 'Date of deactivation' })
  @Prop({ default: null })
  @IsDate()
  @IsOptional()
  detactivatedAt?: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
