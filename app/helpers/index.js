const  crypto = require('crypto');

const SECRET = 'LUCAS-REST-API';

 const authentication = (salt, password) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

 const random = () => crypto.randomBytes(128).toString('base64');

module.exports = {authentication,random}