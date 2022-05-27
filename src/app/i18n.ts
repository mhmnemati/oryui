import path from "path";

const { I18n } = require("i18n");

export const i18n = new I18n({
    locales: ["fa", "en"],
    defaultLocale: "en",
    directory: path.join(__dirname, "..", "locales"),
    cookie: "lang",
});
