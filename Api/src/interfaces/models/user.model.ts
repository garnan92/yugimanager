import { userSchema } from "interfaces/schemas/user.schema";
import { model, Document } from "mongoose";

export interface IUser extends Document {
  mail: String;
  name: String;
  password: String;
}

export default model<IUser>("User", userSchema);
