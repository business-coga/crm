const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.disable('etag') //fix trả về 304
const path = require('path')
const favicon = require('express-favicon')
const morgan = require('morgan')
const cors = require('cors')
const {
    port
} = require('./src/config')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('dev'))
app.use('/public', express.static(path.join(__dirname, './public')))
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use('/ping', (req, res) => {
    res.status(200).send('pong').end()
})

app.use('/api/v1/', require('./src/api'))

app.use((req, res) => {
    res.status(404).send('404')
})


app.listen(port, () => {
    console.log(`CRM-SPA service run on http://127.0.0.1:${port}`)
})