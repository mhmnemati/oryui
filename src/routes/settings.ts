import express from "express";

import { kratos } from "../app/ory";

const router = express.Router();

router.get("/settings", async (req, res) => {
    const flowId = req.query.flow;

    if (!flowId) {
        res.redirect("http://localhost:4433/self-service/settings/browser");
        return;
    }

    const { data } = await kratos.getSelfServiceSettingsFlow(
        String(flowId),
        undefined,
        req.headers.cookie
    );

    res.render("settings", {
        ui: data.ui,
    });
});

export default router;
