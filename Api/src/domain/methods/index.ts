import { Request, Response, NextFunction } from "express";
import * as User from "database/queries/user.query";
import * as Deck from "database/queries/deck.query";
import { selectByMail } from "../../database/queries/user.query";
import { authUser } from "../../database/auth/index";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response, _next: NextFunction) => {
  const user = await User.insert(req.body);
  return res.status(201).json({
    user,
  });
};

const editUser = async (req: Request, res: Response, _next: NextFunction) => {
  await User.update(req.params.id, req.body);

  const user = await User.select(req.params.id);

  return res.status(200).json({
    user,
  });
};

const getUsers = async (_req: Request, res: Response, _next: NextFunction) => {
  const users = await User.selectAll();

  return res.status(200).json({
    users,
  });
};

const getUser = async (req: Request, res: Response, _next: NextFunction) => {
  const user = await User.select(req.params.id);

  return res.status(200).json({
    user,
  });
};

const login = async (req: Request, res: Response, _next: NextFunction) => {
  let { mail, password } = req.body;

  const user = await selectByMail(mail, password);

  if (!user) {
    return res.status(500).json({
      token: null,
      message: "user not found",
    });
  }

  const stringUser = JSON.stringify(user);

  const token = Buffer.from(stringUser, "utf8").toString("base64");

  return res.status(200).json({
    token,
  });
};

const deleteUser = async (req: Request, res: Response, _next: NextFunction) => {
  const user = await User.deleted(req.params.id);

  return res.status(200).json({
    user,
  });
};

export const Users = {
  login,
  createUser,
  editUser,
  getUsers,
  getUser,
  deleteUser,
};

const createDeck = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    let { token } = req.headers;

    const user = await authUser(token ? token.toString() : "");

    if (!user) {
      return res.status(500).json({
        decks: null,
        message: "invalid token",
      });
    }

    let { _id } = user;

    let { name, cards } = req.body;

    const newDeck = {
      name,
      user: _id,
      cards,
    };

    const deck = await Deck.insert(newDeck);
    return res.status(201).json({
      deck,
    });
  } catch (error) {
    return res.status(500).json({
      decks: null,
      error,
    });
  }
};

const editDeck = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    let { token } = req.headers;

    const user = await authUser(token ? token.toString() : "");

    if (!user) {
      return res.status(500).json({
        decks: null,
        message: "invalid token",
      });
    }

    let { _id } = user;

    let { name, cards } = req.body;

    const editDeck = {
      name,
      user: new mongoose.Types.ObjectId(_id),
      cards,
    };
    await Deck.update(req.params.id, editDeck);

    const deck = await Deck.select(req.params.id);

    return res.status(200).json({
      deck,
    });
  } catch (error) {
    return res.status(500).json({
      decks: null,
      error,
    });
  }
};

const getDecks = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    let { token } = req.headers;

    const user = await authUser(token ? token.toString() : "");

    if (!user) {
      return res.status(500).json({
        decks: null,
        message: "invalid token",
      });
    }

    let { _id } = user;

    const decks = await Deck.selectByUser(_id);

    return res.status(200).json({
      decks,
    });
  } catch (error) {
    return res.status(500).json({
      decks: null,
      error,
    });
  }
};

const getDeck = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    let { token } = req.headers;

    const user = await authUser(token ? token.toString() : "");

    if (!user) {
      return res.status(500).json({
        decks: null,
        message: "invalid token",
      });
    }

    const deck = await Deck.select(req.params.id);

    return res.status(200).json({
      deck,
    });
  } catch (error) {
    return res.status(500).json({
      decks: null,
      error,
    });
  }
};

const deleteDeck = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    let { token } = req.headers;

    const user = await authUser(token ? token.toString() : "");

    if (!user) {
      return res.status(500).json({
        decks: null,
        message: "invalid token",
      });
    }

    const deck = await Deck.deleted(req.params.id);

    return res.status(200).json({
      deck,
    });
  } catch (error) {
    return res.status(500).json({
      decks: null,
      error,
    });
  }
};

export const Decks = {
  createDeck,
  editDeck,
  getDecks,
  getDeck,
  deleteDeck,
};
