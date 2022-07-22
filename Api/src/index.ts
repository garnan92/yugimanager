import express from "express";
import { conectDB } from "database/conections";
import { PORT } from "interfaces/constants";
import userRoutes from "domain/routes/user.routes";
import deckRoutes from "domain/routes/deck.routes";
import { USER_URI, DECKS_URI } from "interfaces/constants";

const app = express();

app.use(express.json());

app.use(USER_URI, userRoutes);
app.use(DECKS_URI, deckRoutes);

app.listen(PORT, () => {
  console.log(`port to listen ${PORT}`);
  conectDB();
});
