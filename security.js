const crypto = require('crypto');
const baseurl = require('url-safe-base64');
const config = require('./config');

const algorithm = 'des-ecb';
const key = crypto.scryptSync(config.linkSecret, 'salt', 8);

exports.encrypt = (uid) => {
    const cipher = crypto.createCipheriv(algorithm, key, null);

    let encrypted = cipher.update(uid.replace(/-/gi, ""), 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return baseurl.trim(baseurl.encode(encrypted))
}

exports.decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv(algorithm, key, null);

    let decrypted = decipher.update(baseurl.decode(encrypted), 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted
}

exports.isUUID = (uuid) => {
    return /^[0-9a-fA-F]{32}$/.test(uuid)
}

exports.parseUUID = (uid) => {
    return `${uid.substring(0, 8)}-${uid.substring(8, 12)}-${uid.substring(12, 16)}-${uid.substring(16, 20)}-${uid.substring(20, 32)}`
}