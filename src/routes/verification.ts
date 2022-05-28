import { Express } from "express";

import { kratos } from "../app/ory";

export default (app: Express) => {
    app.get("/verification", async (req, res, next) => {
        const flow = req.query.flow;

        if (!flow) {
            const params = new URLSearchParams(req.query as any);

            return res.redirect(
                `http://localhost:4433/self-service/verification/browser?${params.toString()}`
            );
        }

        try {
            const { data } = await kratos.getSelfServiceVerificationFlow(
                String(flow),
                req.headers.cookie
            );

            res.render("verification", {
                ui: data.ui,
            });
        } catch (err) {
            next(err);
        }
    });
};
