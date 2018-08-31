const router = require('express').Router()
const Lost = require('../databases/lost')

router.post('/lost', async (req, res) => {
    try {
        req.body.data = JSON.parse(req.body.data)
        let img
        data = {id : req.body.data.id, title: req.body.data.title, content: req.body.data.content}
        //console.log(req.body.data)
        if(req.files && req.files.img) {
            img = Date.now()+`-`+req.body.data.id
            req.files.profile.mv(`${__dirname}/../uploads/`+img+`.jpg`, (err) => {
                if(err) {
                    throw new Error('알 수 없는 에러가 발생했습니다.')
                }
            })
            data['img'] = img
        }
        //console.log(req.body.data.tag)
        if(req.body.data.tag) {
            data['tag'] = req.body.data.tag
        }
        if(req.body.data.mapX || req.body.data.mapY) {
            data['mapX'] = req.body.data.mapX
            data['mapY'] = req.body.data.mapY
        }
        const lost = await Lost.create(data)
        return res.json({"result" : {"success" : true, "message" : "글을 정상적으로 작성했습니다.", "_id" : lost._id}})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.get('/lost/:id', async (req, res) => {
    try {
        const target = await Lost.findOne({_id: req.params.id})
        console.log(target.id)
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
}) 

router.get('/lostme/:id', async (req, res) => {
    try {
        const target = await Lost.find({id: req.params.id})
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.get('/lostall/:id', async (req, res) => {
    try {
        const target = await Lost.find({})
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.post('/lostSearch', async (req, res) => {
    try {
        const target = await Lost.find({tag: req.body.tag})
        return res.json({"result" : target})
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : {"success" : false, message}})
    }
})

router.put('/lost/:id', async (req, res) => {
    try {
        req.body.data = JSON.parse(req.body.data)
        //console.log("id : " +req.body.data)
        const target = await Lost.findOne({_id: req.params.id})
        if(target) {
            console.log("target")
            target.title = req.body.data.title
            target.content = req.body.data.content
            target.tag = re.body.data.tag
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

router.delete('/lost/:id', async (req, res) => {
    try {
        const target = await Lost.findOne({_id: req.params.id})
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