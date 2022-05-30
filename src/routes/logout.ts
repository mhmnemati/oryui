import { Express } from "express";

import { kratos } from "../app/ory";

export default (app: Express) => {
    app.get("/logout", async (req, res) => {
        const { data } = await kratos.createSelfServiceLogoutFlowUrlForBrowsers(
            req.headers.cookie
        );

        const params = new URLSearchParams({
            ...req.query,
            token: data.logout_token,
        } as any);

        return res.redirect(
            `http://localhost:4433/self-service/logout?${params.toString()}`
        );
    });
};
