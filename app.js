const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const file = require('express-fileupload')
const config = require('./config/config')

const app = express()

const index = require('./routes/index')
const sign = require('./routes/sign')
const lost = require('./routes/lost')
const find = require('./routes/find')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(file())
app.use('/uploads', express.static('uploads'))

app.use('/', index)
app.use('/', sign)
app.use('/', lost)
app.use('/', find)

app.listen(PORT, () => {
    console.log('listening on port:' + PORT)
})

mongoose.connect(config.mongodbUri)

const db = mongoose.connection;
db.on('error', err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.')
    process.exit()
});

db.once('open', () => { 
    console.log('✓ DB connection success.')
})