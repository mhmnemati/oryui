import { Express } from "express";

export default (app: Express) => {
    app.get("/oidc/consent", async (req, res) => {
        res.render("consent", { title: "Express" });
    });
};
