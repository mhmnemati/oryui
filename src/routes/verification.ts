import { Express } from "express";

import { kratos } from "../app/ory";

const kratosURL = (kratos as any).basePath;

export default (app: Express) => {
    app.get("/verification", async (req, res) => {
        const flow = req.query.flow;

        if (!flow) {
            const params = new URLSearchParams(req.query as any);

            return res.redirect(
                `${kratosURL}/self-service/verification/browser?${params.toString()}`
            );
        }

        const { data } = await kratos.getSelfServiceVerificationFlow(
            String(flow),
            req.headers.cookie
        );

        res.render("verification", {
            ui: data.ui,
        });
    });
};
