const crypto = require('crypto');

const AES = {
  key: Buffer.from(process.env.AES_KEY, 'hex'),
  iv: Buffer.from(process.env.AES_IV, 'hex'),
  algorithm: 'aes-256-cbc',

  encrypt(text) {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },
  decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
}

module.exports = AES;