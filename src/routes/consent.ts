import { app } from "../app/app";

app.get("/consent", function (req, res, next) {
    res.render("consent", { title: "Express" });
});
