import { Express } from "express";

import { kratos } from "../app/ory";

export default (app: Express) => {
    app.get("/settings", async (req, res) => {
        const flow = req.query.flow;

        if (!flow) {
            const params = new URLSearchParams(req.query as any);

            return res.redirect(
                `http://localhost:4433/self-service/settings/browser?${params.toString()}`
            );
        }

        const { data } = await kratos.getSelfServiceSettingsFlow(
            String(flow),
            req.headers.cookie
        );

        res.render("settings", {
            ui: data.ui,
        });
    });
};
