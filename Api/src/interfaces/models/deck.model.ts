import { deckSchema } from "interfaces/schemas/deck.schema";
import mongoose, { model, Document } from "mongoose";

export interface IDeck extends Document {
  name: String;
  user: mongoose.Types.ObjectId;
  cards: [Number];
}

export default model<IDeck>("Deck", deckSchema);
