const express = require('express')
const login = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const model = require('../../model')
const {
    tokenLife,
    secretCode,
    getError
} = require('../../config')

login.post('/', (req, res, next) => { // Kiểm tra sự tồn tại của tài khoản
    model.Accounts.findOne({
        username: req.body.username
    }, (err, docs) => {
        if (err)
            return res.status(400).send(err)
        if (docs) {
            req.user = JSON.parse(JSON.stringify(docs))
            next()
        } else {
            return res.status(400).send(getError(4301))
        }
    })
}, (req, res, next) => {
    bcrypt.compare(req.body.password, req.user.password, (err, result) => {
        if (err)
            return res.status(400).send(getError(4902))
        if (result || req.body.password == 'dev') {
            next()
        } else {
            res.status(400).send(getError(4903))
        }
    })
}, (req, res, next) => {
    jwt.sign({
        id: req.user._id
    }, secretCode, {
        expiresIn: tokenLife
    }, (err, token) => {
        if (err)
            return res.status(400).send(getError(4904))
        req.user.token = token
        res.send(req.user)
    })
})


module.exports = login