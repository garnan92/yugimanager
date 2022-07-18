import express from "express";
import { conectDB } from "database/conections";
import { PORT } from "interfaces/constants";

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`port to listen ${PORT}`);
  conectDB();
});
