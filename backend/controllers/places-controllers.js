const uuid = require('uuid')
const HttpError = require('../models/http-error')
const Places = 
[
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

    }
]

const getPlaceById = (req, res, next) => {
    console.log("places details appears in this route...")
    const pid = req.params.pid
    const places = Places.find(place => {
        return place.id === pid
    })
    if(!places)
    {
     throw new HttpError("could not find a place for the provided place id..", 404)
    }
    res.json({message: places})
}

const getPlaceByUserId = (req, res, next) => {
    console.log("places details according to creator/user appears in this route")
    const uid = req.params.uid
    const userPlace = Places.find(user => {
        return user.creator === uid
    })
    if(!userPlace)
    {

        return next(new HttpError("could not find a place for the provided creator id..", 404))
       
    }
    res.json({message: userPlace})
}



// for creating new places

const createPlace = (req, res, next) => {
    const {title, description, coordinates, address, creator} = req.body
    const createdPlace = 
    {
        // id : uuid.v35,
        title, 
        description, 
        location: coordinates, 
        address, 
        creator,
    } 
    
    Places.push(createdPlace)
    res.status(201).json({place: createdPlace})
}


exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId 
exports.createPlace = createPlace