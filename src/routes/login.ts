import { app } from "../app/app";

app.get("/login", function (req, res, next) {
    res.render("login", { title: "Express" });
});
