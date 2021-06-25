//to include express in more than one file its important to import it in every file.
//register places-middleWare here

const express = require('express')
// const bodyParser = require("body-parser")
// const app = express()

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
const router = express.Router();


router.get('/:pid', (req, res, next) => {
    console.log("places details appears in this route...")
    const pid = req.params.pid
    const places = Places.find(place => {
        return place.id === pid
    })
    if(!places)
    {
        return res.status(404).json({message: "Place not found.."})
    }
    res.json({message: places})
})

router.get('/user/:uid', (req, res, next) => {
    console.log("places details according to creator/user appears in this route")
    const uid = req.params.uid
    const userPlace = Places.find(user => {
        return user.creator === uid
    })
    res.json({message: userPlace})
})

module.exports = router;