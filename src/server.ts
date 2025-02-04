import { Server } from "http";
import express from "express";
import config from "./config";
const PORT = config.PORT || 8080;
const app = express();

let server: Server;
const main = async () => {
  server = app.listen(PORT, () =>
    console.log("The Server is running on port", PORT)
  );
};

// unhandledRejection and uncaughtException error handling--
process.on("unhandledRejection", () => {
  console.log("unhandledRejection error detected, server is shutting down!");

  if (server) {
    server.close();
    process.exit(1);
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  console.log("UncaughtException error detected, server is shutting down!");
  process.exit(1);
});

main();
