const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninjas')

router.get('/ninjas', (req, res, next) => {
  Ninja.aggregate()
    .near({
      near: {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: 'dis'
    })
    .then(ninjas => {
      res.send(ninjas)
    })
    .catch(next)
})

router.post('/ninjas', (req, res, next) => {
  Ninja.create(req.body)
    .then(ninja => {
      res.send(ninja)
    })
    .catch(next)
})

router.put('/ninjas/:id', (req, res, next) => {
  Ninja.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Ninja.findOne({ _id: req.params.id }).then(ninja => {
        res.send(ninja)
      })
    })
    .catch(next)
})

router.delete('/ninjas/:id', (req, res, next) => {
  Ninja.findOneAndDelete({ _id: req.params.id })
    .then(ninja => {
      res.send(ninja)
    })
    .catch(next)
})

module.exports = router
