/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";

const START_SERVER = () => {
  const app = express();

  const hostname = "localhost";
  const port = 8017;

  app.get("/", async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ,I am running at ${hostname}:${port}/`);
  });
  exitHook(() => {
    CLOSE_DB()
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
