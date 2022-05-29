import path from "path";
import fs from "fs";

const { I18n } = require("i18n");

const locales = fs
    .readdirSync(path.join(__dirname, "..", "locales"))
    .map((file) => file.replace(".json", ""));

export let i18n = new I18n({
    locales: locales,
    defaultLocale: "en",
    objectNotation: true,
    directory: path.join(__dirname, "..", "locales"),
    cookie: "lang",
    api: {
        __: "t",
    },
});

i18n.init = (req: any, res: any, next: any) => {
    res.locals.t = (text: any) => {
        if (!text) {
            return "";
        }

        if (typeof text === "string") {
            return i18n.__(text);
        }

        const result = i18n.__(`${text.id}`, {
            ...text.context,
            returnObjects: true,
        });

        if (typeof result === "object") {
            return result[text.text];
        }

        return result;
    };

    return next();
};
