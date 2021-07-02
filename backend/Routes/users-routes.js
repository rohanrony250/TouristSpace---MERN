// USERS RELATED ROUTES ARE HERE


const express = require('express')
const { check } = require('express-validator')
const UsersControllers = require('../controllers/users-controllers')
const router = express.Router()

router.get('/', UsersControllers.getUsers)
router.post('/signup', [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 6})] , UsersControllers.addUsers)
router.post('/login', UsersControllers.userLogin)
module.exports = router