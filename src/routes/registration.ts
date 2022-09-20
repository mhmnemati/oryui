import { Express } from "express";

import { kratos } from "../app/ory";

const kratosURL = (kratos as any).basePath;

export default (app: Express) => {
    app.get("/registration", async (req, res) => {
        const flow = req.query.flow;

        if (!flow) {
            const params = new URLSearchParams(req.query as any);

            return res.redirect(
                `${kratosURL}/self-service/registration/browser?${params.toString()}`
            );
        }

        const { data } = await kratos.getSelfServiceRegistrationFlow(
            String(flow),
            req.headers.cookie
        );

        res.render("registration", {
            ui: data.ui,
        });
    });
};
