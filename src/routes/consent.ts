import { Express } from "express";

export default (app: Express) => {
    app.get("/consent", async (req, res) => {
        res.render("consent", { title: "Express" });
    });
};
