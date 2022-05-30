import { Express } from "express";

import { kratos, hydra } from "../app/ory";

export default (app: Express) => {
    app.get("/oidc/login", async (req, res, next) => {
        const loginChallenge = req.query.login_challenge;

        if (!loginChallenge) {
            return next(new Error("Challenge was not found!"));
        }

        const { data } = await hydra.getLoginRequest(String(loginChallenge));

        if (data.skip) {
            const { data: accept } = await hydra.acceptLoginRequest(
                String(loginChallenge),
                {
                    subject: data.subject,
                }
            );

            return res.redirect(accept.redirect_to);
        }

        const { data: session } = await kratos.toSession(
            undefined,
            req.headers.cookie
        );

        if (!session.active) {
            const query = new URLSearchParams(req.query as any).toString();
            const params = new URLSearchParams({
                return_to: `${process.env.APP_URL}${req.url}?${query}`,
                refresh: "true",
            });

            return res.redirect(`/login?${params.toString()}`);
        } else {
            const { data: accept } = await hydra.acceptLoginRequest(
                String(loginChallenge),
                {
                    subject: session.identity.id,
                    context: session,
                }
            );

            return res.redirect(accept.redirect_to);
        }
    });
};
