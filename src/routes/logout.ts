import { Express } from "express";

import { kratos } from "../app/ory";

export default (app: Express) => {
    app.get("/logout", async (req, res, next) => {
        try {
            const { data } =
                await kratos.createSelfServiceLogoutFlowUrlForBrowsers(
                    req.headers.cookie
                );

            res.redirect(data.logout_url);
        } catch (err) {
            next(err);
        }
    });
};
