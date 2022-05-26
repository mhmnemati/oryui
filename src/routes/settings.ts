import { app } from "../app/app";

app.get("/settings", function (req, res, next) {
    res.render("settings", { title: "Express" });
});
