import express from "express";

const router = express.Router();

router.get("/verification", function (req, res, next) {
    res.render("verification", { title: "Express" });
});

export default router;
