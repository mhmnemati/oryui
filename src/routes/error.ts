import { Express } from "express";

export default (app: Express) => {
    app.get("/error", async (req, res) => {
        res.render("error", { title: "Express" });
    });
};
