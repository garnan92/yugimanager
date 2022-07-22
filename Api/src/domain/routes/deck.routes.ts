import express from "express";
import { Decks } from "domain/methods";

const router = express.Router();

router.get("/", Decks.getDecks);

router.get("/:id", Decks.getDeck);

router.post("/", Decks.createDeck);

router.put("/:id", Decks.editDeck);

router.delete("/:id", Decks.deleteDeck);

export default router;
