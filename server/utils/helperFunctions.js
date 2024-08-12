const crypto = require("node:crypto");

const helperFunctions = {
  generateRandonCode(n) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
    let code = "";

    for (let i = 0; i < n; i++) {
      const randomBytes = crypto.randomBytes(1);
      const randomIndex = randomBytes[0] % characters.length;
      code += characters.charAt(randomIndex);
    }

    return code;
  },
};

module.exports = helperFunctions;
