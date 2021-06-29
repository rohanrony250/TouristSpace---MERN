// USERS RELATED ROUTES ARE HERE


const express = require('express')
const UsersControllers = require('../controllers/users-controllers')
const router = express.Router()

router.get('/', UsersControllers.getUsers)
router.post('/signup', UsersControllers.addUsers)
router.post('/login', UsersControllers.userLogin)