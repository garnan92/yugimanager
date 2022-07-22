import express from "express";
import { Users } from "domain/methods";

const router = express.Router();

router.post("/login", Users.login);

router.post("/", Users.createUser);

router.put("/:id", Users.editUser);

router.delete("/:id", Users.deleteUser);

export default router;
