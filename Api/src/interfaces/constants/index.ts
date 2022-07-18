import dotenv from "dotenv";

dotenv.config();

export const MONGO_DB = `${process.env.MONGO_URL}${process.env.MONGO_DATABASE}`;

export const BEARER = "bearer";

export const PORT = process.env.PORT;

export const USER_URI = "/user";

export const DECKS_URI = "/deck";

export const PROVIDER_CODE = "eyJwcm92aWRlcmNvZGUiOiJ5dWdpIn0=";

export const HOST = `${process.env.HOST}:${PORT}`;
