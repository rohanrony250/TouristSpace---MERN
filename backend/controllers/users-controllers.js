const HttpError = require('../models/http-error')

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
    const createdUser = ({
        name,
        email,
        password
    })
    Users.push(createdUser)
    res.status(201).json({user: createdUser})
 
}

const userLogin = (req, res, next) => { 


}


exports.getUsers = getUsers
exports.addUsers = addUsers
exports.userLogin = userLogin