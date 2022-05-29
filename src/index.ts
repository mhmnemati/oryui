require("dotenv").config();

import { app } from "./app/app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
