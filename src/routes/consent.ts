import express from "express";

const router = express.Router();

router.get("/consent", function (req, res, next) {
    res.render("consent", { title: "Express" });
});

export default router;
