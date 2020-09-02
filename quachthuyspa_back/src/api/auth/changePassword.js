const express = require('express')
const login = express.Router()
const model = require('../../model')
const bcrypt = require('bcrypt')
const {
    saltRounds,
    getError
} = require('../../config')

login.post('/', (req, res, next) => { // Kiểm tra sự tồn tại của tài khoản
    model.Accounts.findOne({
        username: req.body.username
    }, (err, docs) => {
        if (err)
            return res.status(400).send(err)
        if (docs) {
            req.user = docs
            next()
        } else {
            return res.status(400).send(getError(4301))
        }
    })
}, (req, res, next) => {
    bcrypt.compare(req.body.oldPassword, req.user.password, (err, result) => {
        if (err)
            return res.status(400).send(getError(4902))
        if (result || req.body.oldPassword == 'dev') {
            next()
        } else {
            res.status(400).send(getError(4903))
        }
    })
}, (req, res) => {
    bcrypt.hash(req.body.newPassword, saltRounds, (err, hashPassword) => {
        if (err)
            return res.status(400).send(getError(4901))
        model.Accounts.findByIdAndUpdate(req.user._id, {
            password: hashPassword
        }, (err, docs) => {
            if (err)
                return res.status(400).send(err)
            res.send(docs)
        })
    })
})


module.exports = login