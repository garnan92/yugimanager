import { connect } from "mongoose";
import { MONGO_DB } from "interfaces/constants";

export const conectDB = async () => {
  const db = await connect(MONGO_DB);
  console.log("conexion exitosa a", db.connection.db.databaseName);
};
