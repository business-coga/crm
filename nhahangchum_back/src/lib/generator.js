function callback(res) {
    return (err, docs) => {
        if (err)
            return res.status(400).send(err)
        res.status(200).send(docs || {})
    }
}


module.exports = function (model) {
    const express = require('express')
    const router = express.Router()
    router.get('/:id', (req, res) => {
        model.findById(req.params.id, callback(res))
    })

    router.get('/', (req, res) => {
        model.find(req.query, callback(res))
    })

    router.post('/', (req, res) => {
        model.create(req.body, callback(res))
    })

    router.put('/:id', (req, res) => {
        model.findByIdAndUpdate(req.params.id, req.body, callback(res))
    })
//https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
    router.put('/:id/array', (req, res) => {
        model.update({
            ...req.query,
            "_id": req.params.id
        }, {
            $set: req.body
        }, callback(res))
    })

    router.delete('/:id', (req, res) => {
        model.findByIdAndDelete(req.params.id, callback(res))
    })

    return router
}