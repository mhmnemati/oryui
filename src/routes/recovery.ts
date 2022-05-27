import express from "express";

const router = express.Router();

router.get("/recovery", function (req, res, next) {
    res.render("recovery", { title: "Express" });
});

export default router;
