import express from "express";

const router = express.Router();

router.get("/settings", function (req, res, next) {
    res.render("settings", { title: "Express" });
});

export default router;
