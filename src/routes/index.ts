import { app } from "../app/app";

app.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});
