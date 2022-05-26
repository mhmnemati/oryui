import express from "express";
import path from "path";

export const app = express();

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(require("morgan")("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("cookie-parser")());
app.use(express.static(path.join(__dirname, "..", "..", "public")));

app.get("/health", (_, res) => res.send("ok"));
