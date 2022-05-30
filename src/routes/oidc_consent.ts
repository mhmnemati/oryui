import { Express } from "express";

import { hydra } from "../app/ory";
import { csrf } from "../app/csrf";

export default (app: Express) => {
    app.get("/oidc/consent", csrf, async (req, res, next) => {
        const challenge = req.query.consent_challenge;

        if (!challenge) {
            return next(new Error("Challenge was not found!"));
        }

        const { data } = await hydra.getConsentRequest(String(challenge));

        if (data.skip) {
            const { data: accept } = await hydra.acceptConsentRequest(
                String(challenge),
                {
                    session: {
                        id_token: (data.context as any)?.session?.identity
                            ?.verifiable_addresses[0],
                    },
                    grant_scope: data.requested_scope,
                    grant_access_token_audience:
                        data.requested_access_token_audience,
                }
            );

            return res.redirect(accept.redirect_to);
        }

        res.render("oidc_concent", {
            csrf_token: req.csrfToken(),
            challenge: challenge,
            requested_scope: data.requested_scope,
            subject: data.subject,
            client: data.client,
        });
    });

    app.post("/oidc/consent", csrf, async (req, res, next) => {
        const challenge = req.body.challenge;
        const action = req.body.action;

        if (!challenge) {
            return next(new Error("Challenge was not found!"));
        }

        const { data } = await hydra.getConsentRequest(String(challenge));

        if (action === "accept") {
            const { data: accept } = await hydra.acceptConsentRequest(
                String(challenge),
                {
                    remember: true,
                    remember_for: 3600,
                    session: {
                        id_token: (data.context as any)?.session?.identity
                            ?.verifiable_addresses[0],
                    },
                    grant_scope: data.requested_scope?.filter(
                        (scope) => req.body[scope] == "true"
                    ),
                    grant_access_token_audience:
                        data.requested_access_token_audience,
                }
            );

            return res.redirect(accept.redirect_to);
        } else {
            const { data: reject } = await hydra.rejectConsentRequest(
                String(challenge),
                {
                    error: "access_denied",
                    error_description: "The resource owner denied the reques",
                }
            );

            return res.redirect(reject.redirect_to);
        }
    });
};
