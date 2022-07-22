import Deck from "interfaces/models/deck.model";
import mongoose from "mongoose";

export const selectAll = async () => {
  return await Deck.find().exec();
};

export const select = async (id: String) => {
  return await Deck.findById({ _id: id }).exec();
};

export const selectByUser = async (_id: string) => {
  return await Deck.find({ user: { _id } }).exec();
};

export const insert = async (body: any) => {
  let { name, user, cards } = body;

  const deck = new Deck({
    _id: new mongoose.Types.ObjectId(),
    name,
    user: new mongoose.Types.ObjectId(user),
    cards,
  });

  return await deck.save();
};

export const update = async (id: String, body: any) => {
  return await Deck.findByIdAndUpdate({ _id: id }, body);
};

export const deleted = async (id: String) => {
  return await Deck.findByIdAndDelete({ _id: id });
};
