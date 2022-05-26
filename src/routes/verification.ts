import { app } from "../app/app";

app.get("/verification", function (req, res, next) {
    res.render("verification", { title: "Express" });
});
