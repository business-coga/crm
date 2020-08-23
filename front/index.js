const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const port = process.env.WEB_PORT || 3000
const app = express()
app.use(favicon(__dirname + '/public/favicon.ico'))
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')))
app.get('/ping', function (req, res) {
    res.status(200).send('pong').end()
})
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port,()=>{
  console.log('CRM client : ' port)
})