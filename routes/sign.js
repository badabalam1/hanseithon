const router = require('express').Router()
const User = require('../databases/User')
const jwt = require('jsonwebtoken')
const constants = require('../config/config')

router.post('/login', async (req, res) => {
    try {
        const target = await User.findOne({id : req.body.id, pw : req.body.pw})
        if(!target) {
            throw new Error('아이디 혹은 비밀번호가 틀렸습니다.')
        }
        if(!req.body.pw === target.pw) {
            throw new Error('아이디 혹은 비밀번호가 틀렸습니다.')
        }
        const token = jwt.sign({id : target._id } ,constants.JWT_SALT);
        return res.json({"result" : {"success" : true , "message" : "로그인에 성공했습니다"}, "auth" : {"token" : token }, "user" : {"id" : target.id}})
    }catch(err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false , message}})
    }
})

module.exports = router