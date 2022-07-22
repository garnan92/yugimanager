import mongoose, { Schema } from "mongoose";

export const deckSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  cards: {
    type: [Number],
  },
});
