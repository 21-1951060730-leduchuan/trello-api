/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
const START_SERVER = () => {
  const app = express();

  const hostname = env.APP_HOST;
  const port = env.APP_PORT || 8080;
  app.use(express.json());
  app.use("/v1", APIs_V1);
  app.use(errorHandlingMiddleware);
  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ,I am running at ${hostname}:${port}/`);
  });
  exitHook(() => {
    CLOSE_DB();
  });
};

(async () => {
  try {
    await CONNECT_DB();
    console.log("CONNECTED TO DB");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
