const express = require('express')
const router = express.Router()
const service = require('./service')

router.post('/login', authenticate)
router.post('/register', register)
router.post('/validate', validate)
router.post('/emailvalidate', emailvalidate)
router.post('/phonevalidate', phonevalidate)
//router.get('/logout', logout)
router.get('/all', getAll)
router.get('/current', getCurrent)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router

function authenticate(req, res, next) {
    service.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({message: "Username or password is incorrect"}))
    .catch(err => next(err))
}
function validate(req, res, next) {
    service.validate(req.body)
    .then(body => res.json({body}))
    .catch(err => next(err))
  
 
}
function phonevalidate() {}
function emailvalidate(req, res, next) {
    service.emailvalidate(req.body)
    .then(() => res.json({body}))
    .catch(err => next(err))
}

function register(req, res, next) {
    service.create(req.body)
    .then(user => res.json(user))
    .catch(err => next(err))
}

function getAll(req, res, next) {
    service.getAll()
    .then(users => res.json(users))
    .catch(err => next(err))
}

function getCurrent(req, res, next) {
    service.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
}

function getById(req, res, next) {
    service.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
}

function update(req, res, next) {
    service.update(req.params.id, req.body)
    .then(() =>  res.json({}))
    .catch(err => next(err))
}

function _delete(req, res, next) {
    service.delete(req.params.id)
    .then(() =>  res.json({}))
    .catch(err => next(err))
}
