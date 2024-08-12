const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const { redis, mongodb } = require("./config");
const commonResponseMiddleware = require("./middleware/commonResponseMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");

// Middleware for parsing JSON and handling HTTP requests
app.use(cors({ origin: ["*", "https://tfgadmin.tfggames.com"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(commonResponseMiddleware);

async function resolveDependencies() {
  await redis.connect();
  await mongodb.connect();
  return Promise.resolve();
}

const PORT = process.env.PORT || 3000;
resolveDependencies().then(() => {
  const routeIndex = require("./router");
  const API_PREFIX = process.env.API_PREFIX || "";
  app.use(`${API_PREFIX}/`, routeIndex);

  app.use(errorHandlerMiddleware);
  app.use(notFoundMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
