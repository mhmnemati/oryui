require("dotenv").config();

import { app } from "./app/app";
import { i18n } from "./app/i18n";

const port = process.env.PORT || 3000;

app.use(i18n.init);
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
