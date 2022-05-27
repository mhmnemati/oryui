import express from "express";

import { kratos } from "../app/ory";

const router = express.Router();

router.get("/login", async (req, res) => {
    const flowId = req.query.flow;

    if (!flowId) {
        res.redirect("http://localhost:4433/self-service/login/browser");
        return;
    }

    const { data } = await kratos.getSelfServiceLoginFlow(
        String(flowId),
        req.headers.cookie
    );

    res.render("login", {
        ui: data.ui,
    });
});

export default router;
