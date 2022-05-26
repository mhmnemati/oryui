import { app } from "../app/app";

app.get("/recovery", function (req, res, next) {
    res.render("recovery", { title: "Express" });
});
