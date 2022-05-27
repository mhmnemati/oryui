import express from "express";

const router = express.Router();

router.get("/registration", function (req, res, next) {
    res.render("registration", { title: "Express" });
});

export default router;
