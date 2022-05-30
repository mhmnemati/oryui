import csurf from "csurf";

export const csrf = csurf({ cookie: true });
