import User from "interfaces/models/user.model";
import mongoose from "mongoose";

export const selectAll = async () => {
  return await User.find().exec();
};

export const select = async (id: String) => {
  return await User.findById({ _id: id }).exec();
};

export const selectByMail = async (mail: String, password: String) => {
  return await User.findOne({
    mail,
    password: Buffer.from(password, "utf8").toString("base64"),
  }).exec();
};

export const insert = async (body: any) => {
  let { name, mail, password } = body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    mail,
    password: Buffer.from(password, "utf8").toString("base64"),
  });

  return await user.save();
};

export const update = async (id: String, body: any) => {
  return await User.findByIdAndUpdate({ _id: id }, body);
};

export const deleted = async (id: String) => {
  return await User.findByIdAndDelete({ _id: id });
};
