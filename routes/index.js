const express = require('express')

const router = express.Router()
const signup = require('../controllers/AuthController').signup
const login = require('../controllers/AuthController').login
const activeUsers = require('../controllers/AuthController').activeUsers
const clearAuth = require('../controllers/AuthController').clearAuth
const chatMessage = require('../controllers/AuthController').chatMessage

router.use(express.json())
router.use(express.urlencoded({extended : true}))

router.post('/auth/signup', signup)
router.post('/auth/login',login)

router.get('/all-active-users',activeUsers)

router.post('/clear-auth',clearAuth)

router.post('/get-user-chat',chatMessage)


module.exports = router