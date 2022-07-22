import userModel from "interfaces/models/user.model";

export const authUser = async (token: string) => {
  const buffer = Buffer.from(token, "base64").toString("utf8");

  const json = JSON.parse(buffer);

  let { _id } = json;

  const user = await userModel.findById({ _id }).exec();

  if (!user) {
    return null;
  }

  return user;
};
