const express = require('express')
const userRouter = express.Router()
const Places = [
    {
        id: 'p1',
        title: 'Kuwait Towers',
        description: 'The Kuwait Towers are a group of three slender towers in Kuwait City.',
        imageUrl: 'https://images.unsplash.com/photo-1611469950170-b492451694ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        address: 'Arabian Gulf St, Kuwait City',
        location: {
            lat: 29.389714,
            lng: 48.0011012
        },
        creator: 'u1'
    }]


userRouter.get('/:uid', (req, res, next) => {
    console.log("user-routes appears here..!")
    const uid = req.params.uid
    console.log(uid)
    const userPlace = Places.find(user => {
        return user.creator === uid
    })
    res.json({user: userPlace.title})
})

module.exports = userRouter