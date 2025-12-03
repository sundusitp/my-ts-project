import express from "express";
import { appConfig } from "./config/appConfig";
import userRoutes from "./routes/userRoutes";
import { log } from "./utils/logger";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(appConfig.port, () => {
  log(`${appConfig.appName} running on port ${appConfig.port}`);
});
