const { rabbitmq } = require("../config");

module.exports = (data, level) => {
  try {
    if (process.env.ENVIRONMENT === "PROD") {
      // Logs can be store here using winston or any other tools
      // Logs can also be sent to another server for faster processing For Example : RabbitMQ/Kafka
      console.log("Error Log => ", level, data);
    }
  } catch (error) {
    console.log("Create Logger Failed =>", error.toString());
  }
};
