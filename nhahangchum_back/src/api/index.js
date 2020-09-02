const express = require('express')
const api = express.Router()
const generator = require('../lib/generator')
const model = require('../model')


api.use('/accounts', generator(model.Accounts))
api.use('/tickets', generator(model.Tickets))

api.use('/signup', require('./auth/signup'))
api.use('/login', require('./auth/login'))
api.use('/change-password', require('./auth/changePassword'))

module.exports = api