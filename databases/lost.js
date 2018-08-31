const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lostSchema = new Schema({
    id : {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    img: [{type: String, required: false}],
    tag: [{type: String, required: false}],
    mapX: {type: Number, required: false},
    mapY: {type: Number, required: false},
    createDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('lost', lostSchema)