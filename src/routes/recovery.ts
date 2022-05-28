import { Express } from "express";

import { kratos } from "../app/ory";

export default (app: Express) => {
    app.get("/login", async (req, res) => {
        const flowId = req.query.flow;

        if (!flowId) {
            res.redirect("http://localhost:4433/self-service/recovery/browser");
            return;
        }

        const { data } = await kratos.getSelfServiceRecoveryFlow(
            String(flowId),
            req.headers.cookie
        );

        res.render("recovery", {
            ui: data.ui,
        });
    });
};
