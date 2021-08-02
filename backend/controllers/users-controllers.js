const HttpError = require('../models/http-error')
const {validationResult} = require('express-validator')
const uuid = require ('uuid').v4
const Usermodel = require('../models/User')






const getUsers = async (req,res,next) => {
 
   let users;
    try
    {
       users = await Usermodel.find({}, '-password')
    }
    catch(err)
    {
        return next(new HttpError('Something went wrong, please try again', 500))
    }
    if(!users)
    {
        return next(new HttpError('No users found!', 422))
    }
    res.status(200).json({users: users.map(user => user.toObject({getters: true}))})
}

const addUsers = async (req, res, next) => {

    const validationError = validationResult(req)
    let existingUser;
    let createdUser;
    if(!validationError.isEmpty())
    {
        return next(new HttpError("Could not sign you up, please check all fields once again..", 422))
    }

    const {name, email, password} = req.body

    try
    {
        existingUser = await Usermodel.findOne({email: email})
    }
    catch(err)
    {
        return next(new HttpError('Something went wrong, please try again later', 500))
    }

    if(existingUser)
    {
        return next(new HttpError('User already exists, please login instead..', 422))
    }

    createdUser = new Usermodel({
        name,
        email,
        password, 
        image: "https://picsum.photos/500",
        places: [] 
    })
    

    try
    {
       await createdUser.save()
    }
    catch(err)
    {
        return next(new HttpError('Something went wrong, please try again later..', 500))
    }
    res.status(201).json({user: createdUser.toObject({getters: true})})
    
}

const userLogin = async (req, res, next) => { 

    const {email, password} = req.body
    let identifiedUser;
    try
    {
        identifiedUser = await Usermodel.findOne({email : email, password: password})
    }
    catch(err)
    {
        return next(new HttpError('Something went wrong, please try again later', 500))
    }
    if(!identifiedUser)
    {
        return next(new HttpError('Could not find user, authentication failed', 401))
    }

    res.json(
        {
            message: "Logged In",
            user: identifiedUser.toObject({getters: true})
        
        })
}


exports.getUsers = getUsers
exports.addUsers = addUsers
exports.userLogin = userLogin