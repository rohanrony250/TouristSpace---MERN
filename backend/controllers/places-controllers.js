const HttpError = require('../models/http-error')
const uuid = require('uuid').v4
const { validationResult } = require('express-validator')
let Places = 
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

const getPlacesByUserId = (req, res, next) => {
    console.log("places details according to creator/user appears in this route")
    const uid = req.params.uid
    const userPlaces = Places.filter(user => {
        return user.creator === uid
    })
    if(!userPlaces || userPlaces.length === 0)
    {

        return next(new HttpError("could not find places for the provided creator id..", 404))
       
    }
    res.json({userPlaces})
}



// for creating new places

const createPlace = (req, res, next) => {
    const validationError = validationResult(req)
    console.log(validationError)
    if(!validationError.isEmpty())
    {
        throw new HttpError("could not create place, please check your inputs.. some fields are invalid", 422)
    }
    const {title, description, address, creator} = req.body
    const coordinates = {
        lat: 29.389714,
        lng: 48.0011012
    }
    const createdPlace = 
    {
        id : uuid(),
        title, 
        description, 
        location: coordinates, 
        address, 
        creator,
    } 
    
    Places.push(createdPlace)
    res.status(201).json({place: createdPlace})
}

const updatePlace = (req, res, next) => {
    const validationError = validationResult(req)
    if(!validationError.isEmpty())
    {
        throw new HttpError("could not update place, please check your inputs.. some fields are invalid", 422)
    }
    const {title, description} = req.body;
    const placeId = req.params.pid;
    const updatePlace = { ...Places.find(p => p.id === placeId) }
    const placeIndex = Places.findIndex(p => p.id === placeId)
    updatePlace.title = title
    updatePlace.description = description
    Places[placeIndex] = updatePlace
    res.status(200).json({place: updatePlace})
    
}

const deletePlace = (req, res, next) => {

    const placeId = req.params.pid;
    if(!Places.find(p => p.id === placeId))
    {
        throw new HttpError("place doesnt exist, hence could not delete..",422)
    }
    Places = Places.filter(p => p.id != placeId)
    res.status(200).json({message: "Deleted Place..!"})

}


exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId 
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace