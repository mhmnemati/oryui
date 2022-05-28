import { Express } from "express";

export default (app: Express) => {
    app.get("/", async (req, res) => {
        res.render("index", { title: "Express" });
    });
};
