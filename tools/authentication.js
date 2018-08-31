const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (req, res, next) => {
    console.log("header : " + req.headers.toString());
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization, config.JWT_SALT , (err, decoded) => {
            if (!err && decoded) {
                req.user = decoded;
                //console.log(req.user)
            }
        });
    }
    next();
};