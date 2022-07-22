import { Schema } from "mongoose";

export const userSchema = new Schema({
  mail: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
