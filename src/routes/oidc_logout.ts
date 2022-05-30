import { Express } from "express";

import { kratos, hydra } from "../app/ory";

export default (app: Express) => {
    app.get("/oidc/logout", async (req, res, next) => {
        const challenge = req.query.logout_challenge;

        if (!challenge) {
            return next(new Error("Challenge was not found!"));
        }

        const { data: session } = await kratos.toSession(
            undefined,
            req.headers.cookie
        );

        if (session.active) {
            const query = new URLSearchParams(req.query as any).toString();
            const params = new URLSearchParams({
                return_to: `${process.env.APP_URL}${req.url}?${query}`,
                refresh: "true",
            });

            return res.redirect(`/logout?${params.toString()}`);
        } else {
            const { data: accept } = await hydra.acceptLogoutRequest(
                String(challenge)
            );

            return res.redirect(accept.redirect_to);
        }
    });
};
