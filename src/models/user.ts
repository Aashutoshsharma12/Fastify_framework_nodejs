import { Schema, model } from "mongoose";

interface user {
  role: string;
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  password: string;
  isVerified: boolean,
  isDelete: boolean;
  isActive: boolean;
}

const userSchema = new Schema<user>(
  {
    role: { type: String, default: "user" }, //user,company
    name: { type: String, required: true },   // Company Name
    email: { type: String, default: "", trim: true, lowercase: true },
    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = model<user>(
  "user",
  userSchema
);
export = userModel;
