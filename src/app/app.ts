import express from "express";
import path from "path";
import fs from "fs";

import { renderFile } from "eta";

import { i18n } from "./i18n";

export const app = express();

app.engine("eta", renderFile);
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "eta");

app.use(require("morgan")("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("cookie-parser")());
app.use(express.static(path.join(__dirname, "..", "..", "public")));

app.use(i18n.init);

app.get("/health", (_, res) => res.send("ok"));

for (const file of fs.readdirSync(path.join(__dirname, "..", "routes"))) {
    app.use(require(path.join(__dirname, "..", "routes", file)).default);
}
