const HttpError = require('../models/http-error')
const {validationResult} = require('express-validator')
const uuid = require ('uuid').v4
const Usermodel = require('../models/User')



let Users = 
[
    {
        id: 'u1',
        name: "Rohan Rony",
        email: "rohanrony@hotmail.com",
        password: "******"

    },
    {
        id: 'u2',
        name: "Amaan Khan",
        email: "amaanKhan@hotmail.com",
        password: "******"

    },
    {
        id: 'u3',
        name: "Sharath Pradeep",
        email: "sharathPradeep@hotmail.com",
        password: "******"

    },
]


const getUsers = (req,res,next) => {

    res.status(200).json({users: Users})

}

const addUsers = async (req, res, next) => {

    const validationError = validationResult(req)
    let existingUser;
    let createdUser;
    if(!validationError.isEmpty())
    {
        return next(new HttpError("Could not sign you up, please check all fields once again..", 422))
    }

    const {name, email, password, places} = req.body

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
        places 
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

const userLogin = (req, res, next) => { 

    const {email, password} = req.body
    const identifiedUser = Users.find(user => user.email === email)
    if(!identifiedUser || identifiedUser.password !== password)
    {
        throw new HttpError("Could not identify user, authentication failed", 401)
    }
    res.json({message: "Logged In"})
}


exports.getUsers = getUsers
exports.addUsers = addUsers
exports.userLogin = userLogin