import { app } from "../app/app";

app.get("/registration", function (req, res, next) {
    res.render("registration", { title: "Express" });
});
