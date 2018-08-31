const router = require('express').Router()
const User = require('../databases/User')
const filter = require('../tools/authentication')
const validator = require('../tools/validator')

router.post('/register', async (req, res) => {
    try {
        let profile
        //console.log(req.body.data)
        req.body.data = JSON.parse(req.body.data)
        if((await User.findOne({ id : req.body.data.id}))) {
            throw new Error('이미 등록된 아이디입니다')
        }
        console.log(req.body.data)
        if(req.files && req.files.profile) {
            req.files.profile.mv(`${__dirname}/../uploads/${req.body.data.id}.jpg`, (err) => {
                if(err) {
                    console.log('알 수 없는 에러가 발생했습니다.')
                }
            })
            profile = req.body.data.id
        } else {
            profile = 'basicprofile'
        }
        const data = {id : req.body.data.id , pw : req.body.data.pw , profile : profile, name: req.body.data.name, phone: req.body.data.phone, email: req.body.data.email}
        //console.log(data.profile)
        const user = await User.create(data)
        user.password = user.__v = undefined
        return res.json({"result" : {"success" : true , "message" : "회원가입에 성공했습니다."}})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.post('/', filter, async (req, res) => {
    try {
        let profile
        if(await !validator.isLogin(req, res)) return
        const target = await User.findOne({id : req.body.id }) 
        if(!target) {
            throw  new Error('계정이 존재하지 않습니다.')
        }
        return res.json({"result" : {"success" : true , "pw" : target.pw}})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false , message }})
    }
})

router.put('/:id', filter, async (req, res) => {
    try {
        req.body.data = JSON.parse(req.body.data)
       if(await !validator.isLogin(req, res)) return
       console.log(req.params.id)
        const target = await User.findOne({id : req.params.id})
        if(!target) {
            throw new Error("계정이 존재하지 않습니다.")
        }
        console.log(req.user.id)
        //console.log(target._id)
        if(req.user.id.toString() !== target._id.toString()) {
            throw new Error('권한이 없습니다')
        }
        if(req.body.data.pw === target.pw) {
            throw new Error('기존 비밀번호랑 같습니다')
        }
        if(req.files && req.files.profile) {
            req.files.profile.mv(`${__dirname}/../uploads/${req.params.id}.jpg`, (err) => {
                if(err) {
                    console.log('알 수 없는 에러가 발생했습니다.')
                }
            })
        }
        target.pw = req.body.pw
        const user = await target.save()
        user.password = user.__v = undefined;
        return res.json({"result" : {"success" : true , "message" : "비밀번호가 변경되었습니다."}})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message }})
    }
})

router.delete('/:id', filter, async (req, res) => {
    try {
        if(await !validator.isLogin(req, res)) return
        const target = await User.findOne({id : req.params.id}) 
        if(!target) {
            throw new Error('계정이 존재하지 않습니다.')
        }
        if(req.user.id.toString() !== target._id.toString()) {
            throw new Error('권한이 없습니다')
        }
        const user = await target.remove()
        target.remove();
        return res.status(200).json({"result" : {"success" : true , "message" : "계정이 삭제되었습니다."}})
    } catch(err) {
        const { message } = err    
        res.status(400).json({"result" : {"success" : false , message}})
    }
})

router.get('/User/:id', async (req, res) => {
    try {
        const target = await User.findOne({id : req.params.id})
        return res.status(200).json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(400).json({"result" : {"success" : false, message}})
    }
})

module.exports = router