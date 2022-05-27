import path from "path";

const { I18n } = require("i18n");

export let i18n = new I18n({
    locales: ["fa", "en"],
    defaultLocale: "en",
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
