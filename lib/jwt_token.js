const de = require('dotenv')
const jwt = require('jsonwebtoken');

de.config({ path: '../.env' });

const secretkey = process.env.JWT_SECRETKEY;

exports.get_token = function (ID) {
    const payload = {ID: ID};
    const option = {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRESIN,
        issuer: process.env.JWT_ISSUER
    }
    return jwt.sign(payload, secretkey, option)
}

exports.verify = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretkey, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        })
    })
}



