import mongoose from 'mongoose';
import { Gender, Role } from './requestModels/userRequest';

const options = {
  collection: "users",
  versionKey: false,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
  timestamps: {
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  },
};


export type addressEntity = {
  address1: string,
  address2: string,
  address3: string,
  city: string,
  state: string,
  country: string,
  postcode: string,
}

export type userEntity = {
  firstName: string,
  lastName: string,
  email: string,
  emailVerify: boolean,
  password: string,
  mobile: number,
  gender: Gender,
  address: addressEntity,
  role: Role,
  status: boolean,
  profileImage: string
};

const address = new mongoose.Schema<addressEntity>({
  address1: { type: String },
  address2: { type: String },
  address3: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postcode: { type: String },
});

// Schema
export const schema = new mongoose.Schema<userEntity>({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  emailVerify: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  mobile: { type: Number },
  gender: {
    type: String,
    enum: Gender,
  },
  address: address,
  role: {
    type: String,
    enum: Role,
    default: Role.USER,
  },
  status: {
    type: Boolean,
    default: true,
  },
  profileImage: { type: String }
},
  options
);

// type User = mongoose.InferSchemaType<typeof schema>;

export const userModel = mongoose.model('users', schema);