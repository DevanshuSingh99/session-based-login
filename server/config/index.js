const redisConfig = require("./database/redis");
const mongodbConfig = require("./database/mongodb");

// Export the combined configuration
module.exports = {
  // Redis configuration
  redis: {
    connect: redisConfig.connect,
    getClient: redisConfig.getClient,
    getCache: redisConfig.getCache,
    setCache: redisConfig.setCache,
  },
  // MongoDB configuration
  mongodb: {
    connect: mongodbConfig.connect,
    connection: mongodbConfig.connection,
  },
  // ... Other configurations
};
