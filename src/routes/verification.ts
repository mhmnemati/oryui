import { Express } from "express";

import { kratos } from "../app/ory";

export default (app: Express) => {
    app.get("/login", async (req, res) => {
        const flowId = req.query.flow;

        if (!flowId) {
            res.redirect(
                "http://localhost:4433/self-service/verification/browser"
            );
            return;
        }

        const { data } = await kratos.getSelfServiceVerificationFlow(
            String(flowId),
            req.headers.cookie
        );

        res.render("verification", {
            ui: data.ui,
        });
    });
};
