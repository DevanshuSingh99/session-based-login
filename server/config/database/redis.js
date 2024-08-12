const { Redis } = require("ioredis");

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;

let client;
const connect = async () => {
  try {
    client = new Redis(parseInt(redisPort), redisHost, {
      password: redisPassword,
    });

    client.on("connect", (err) => {
      console.log("Redis client is connected");
    });
    client.on("error", (err) => {
      setTimeout(() => {
        console.log(`Retrying connection to Redis ...`);
        connect;
      }, 2000);
    });
  } catch (err) {
    console.log("Error connecting to redis....");
  }
};

const getCache = async (key) => {
  let result = JSON.parse(await client.get(key));
  return result;
};

const setCache = async (key, value, options = {}) => {
  let stringifiedValue = JSON.stringify(value);

  const defaultTTL = options.ttl || 172800; // Default TTL is 48 hour
  return await client.set(key, stringifiedValue, "EX", defaultTTL);
};

const invalidateCache = async (key) => {
  return await client.del(key);
};

/**
 * Returns the Redis client instance
 * @returns {Redis}
 */
const getClient = () => {
  return client;
};

module.exports = {
  connect,
  getClient,
  getCache,
  setCache,
  invalidateCache,
};
