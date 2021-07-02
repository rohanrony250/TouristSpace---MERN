const HttpError = require('../models/http-error')
const uuid = require ('uuid').v4

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

const addUsers = (req, res, next) => {

    const {name, email, password} = req.body
    const userExist = Users.find(user => user.email === email)
    if(userExist)
    {
        throw new HttpError('Could not create user, user exists', 422)
    }
    else{
        const createdUser = ({
            id: uuid(),
            name,
            email,
            password
        })
        Users.push(createdUser)
        res.status(201).json({user: createdUser})
    }
    
 
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