const mongoose = require("mongoose");

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoHostPort = process.env.MONGO_HOST_PORT;
const mongoDb = process.env.MONGO_DB;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

let mongoURI =
  mongoUser && mongoPassword
    ? `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHostPort}/${mongoDb}`
    : `mongodb+srv://${mongoHost}:${mongoPort}/${mongoDb}`;

const connect = async () => {
  try {
    mongoose.connection.on("disconnected", function () {
      console.log("MONGOOSE : disconnected default connection ...");
      setTimeout(connect, 1000);
    });

    mongoose.connection.on("open", function () {
      console.log("Connected to MongoDB");
    });

    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 1000,
      directConnection: process.env.MONGO_DIRECT_CONNECT === "true",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.toString());
    setTimeout(connect, 1000);
  }
};

module.exports = {
  connect,
  connection: mongoose.connection,
};
