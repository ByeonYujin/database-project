const crypto = require('crypto');
const config = require('./config');

const algorithm = 'des-ecb';
const key = crypto.scryptSync(config.linkSecret, 'salt', 8);

const cipher = crypto.createCipheriv(algorithm, key, null);
const decipher = crypto.createDecipheriv(algorithm, key, null);

exports.encrypt = (uid) => {
    let encrypted = cipher.update(uid.replace(/-/gi, ""), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted
}

exports.decrypt = (encrypted) => {
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return `${decrypted.substring(0, 8)}-${decrypted.substring(8, 12)}-${decrypted.substring(12, 16)}-${decrypted.substring(16, 20)}-${decrypted.substring(20, 32)}`
}