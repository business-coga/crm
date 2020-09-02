const express = require('express')
const signup = express.Router()
const model = require('../../model')
const bcrypt = require('bcrypt')
const {saltRounds, getError} = require('../../config')

signup.post('/', (req, res, next) => {
    model.Accounts.findOne({
        username: req.body.username
    }, (err, docs) => {
        if (err)
            return res.status(400).send(err)
        if (docs) {
            return res.status(400).send(getError(4302))
        } else {
            next()
        }
    })
}, (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hashPassword) => {
        if (err)
            return res.status(400).send(getError(4901))
        req.body.password = hashPassword
        next()
    })
}, (req, res) => {
    model.Accounts.create(req.body, (err, docs) => {
        if (err)
            return res.status(400).send(err)
        res.send(docs)
    })
})


module.exports = signup