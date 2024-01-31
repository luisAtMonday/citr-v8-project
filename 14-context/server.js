import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// eslint-disable-next-line import/no-unresolved
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();
const parts = html.split("not rendered");

const app = express();
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

app.use((req, res) => {
  // Write the head and the body until the root-div immediately
  res.write(parts[0]);
  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError() {
      // Error handling goes here
    },
    onAllReady() {
      // Write the rest of the html after the root-div
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

app.listen(PORT);
