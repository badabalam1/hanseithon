const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id : {type: String, required: true, unique: true },
    pw : {type: String, required: true },
    profile : {type: String, required: true},
    name : {type: String, required: true },
    phone : {type: String, required: true},
    email : {type: String, required: true }

})

function encryptPassword(next) {
    if (!this.isModified('password')) return next()
    this.password = password(this.password)
    return next()
}

function removePassword(next) {
    this.select('-password -__v')
    return next()
}

userSchema.pre('save', encryptPassword)
userSchema.pre('update', encryptPassword)
userSchema.pre('findOne', removePassword)

userSchema.method.comparPassword = function (plainPassword) {
    if (this.password === password(plainPassword)) return true
    return false
}

module.exports = mongoose.model('user', userSchema)