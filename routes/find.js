const router = require('express').Router()
const Find = require('../databases/find')

router.post('/find', async (req, res) => {
    try {
        req.body.data = JSON.parse(req.body.data)
        let img
        data = {id : req.body.data.id, title: req.body.data.title, content: req.body.data.content}
        if(req.fils && req.files.img) {
            img = Date.now()+'-'+req.body.data.id
            req.files.profile.mv(`${__dirname}/../uploads/`+img+`.jpg`, (err) => {
                if(err) {
                    throw new Error('알 수 없는 에러가 발생했습니다.')
                }
            })
        }
        img = 'test'
        data['img'] = img
        if(req.body.data.tag) {
            data['tag'] = req.body.data.tag
        }
        if(req.body.data.mapX || req.body.data.mapY) {
            data['mapX'] = req.body.data.mapX
            data['mapY'] = req.body.data.mapY
        }
        const find = await Find.create(data)
        return res.json({"result" : {"success" : true, "message" : "글을 정상적으로 작성했습니다.", "_id": find._id}})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.get('/find/:id', async (req, res) => {
    try {
        const target = await Find.findOne({_id: req.params.id})
        console.log(target.id)
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    } 
})

router.get('/findme/:id', async (req, res) => {
    try {
        const target = await Find.find({id: req.params.id})
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.get('/findall/:id', async (req, res) => {
    try {
        const target = await Find.find({})
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.post('/findSearch', async (req, res) => {
    try {
        const target = await Find.find({tag: req.body.tag})
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.put('/find/:id', async (req, res) => {
    try {
        req.body.data = JSON.parse(req.body.data)
        console.log("id : " +req.body.data)
        const target = await Find.findOne({_id: req.params.id})
        if(target) {
            console.log("target")
            target.title = req.body.data.title
            target.content = req.body.data.content
            target.tag = req.body.data.tag
            target.mapX = req.body.data.mapX
            target.mapY = req.body.data.mapY
            target.save()
        }
        return res.json({"result" : {"success" : true, "message" : "수정되었습니다."}})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.delete('/find/:id', async (req, res) => {
    try {
        const target = await Find.findOne({_id: req.params.id})
        if(!target) {
            throw new Error('계정이 존재하지 않습니다.')
        }
        const user = await target.remove()
        return res.status(200).json({"result" : {"success" : true , "message" : "삭제되었습니다." }})
    } catch (err) {
        const { message } = err
        res.status(400).json({"result" : {"success" : false , message }})
    }
})

module.exports = router