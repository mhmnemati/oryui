import { Express } from "express";

import { kratos } from "../app/ory";

export default (app: Express) => {
    app.get("/login", async (req, res) => {
        const flowId = req.query.flow;

        if (!flowId) {
            const params = new URLSearchParams(req.query as any);

            return res.redirect(
                `http://localhost:4433/self-service/login/browser?${params.toString()}`
            );
        }

        const { data } = await kratos.getSelfServiceLoginFlow(
            String(flowId),
            req.headers.cookie
        );

        res.render("login", {
            ui: data.ui,
        });
    });
};
