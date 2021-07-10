const HttpError = require('../models/http-error')
const mongoose = require('mongoose')
const uuid = require('uuid').v4
const { validationResult } = require('express-validator')
const Placemodel = require('../models/Place')
const Usermodel = require('../models/User')
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

const getPlaceById = async (req, res, next) => {
    console.log("places details appears in this route...")
    const pid = req.params.pid
    let places;
    try
    {
        places = await Placemodel.findById(pid)
    }
    catch(err)
    {
        const error = new HttpError('Something went wrong, could not find a place', 500)

        return next(error)
    }
    
    if(!places)
    {
     throw new HttpError("could not find a place for the provided place id..", 404)
    }
    res.json({place: places.toObject({getters : true})})
}

const getPlacesByUserId = async (req, res, next) => {
    console.log("places details according to creator/user appears in this route")
    const uid = req.params.uid
    let userPlaces
    try
    {
        userPlaces = await Placemodel.find({creator : uid})
    }
    catch(err)
    {
        const error = new HttpError ('fetching places failed, please try again later', 500)
        return next(error)
    }
    if(!userPlaces || userPlaces.length === 0)
    {

        return next(new HttpError("could not find places for the provided user id..", 404))
       
    }
    res.json({userplaces: userPlaces.map(place => place.toObject({getters: true}))})
}



// for creating new places

const createPlace = async (req, res, next) => {
    const validationError = validationResult(req)
    let user;
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
    const createdPlace = new Placemodel({
        title, 
        description, 
        image: "https://images.unsplash.com/photo-1611469950170-b492451694ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        address, 
        location: coordinates, 
        creator
    }); 
    
    try
    {
        user = await Usermodel.findOne(creator)
    }
    catch(err)
    {
        return next(new HttpError('Something went wrong, please try again later', 500))
    }

    if(!user)
    {
        return next(new HttpError('Could not find user, oops!', 404))
    }


    try
    {
        const session = await mongoose.startSession()
        session.startTransaction()
        await createdPlace.save({session : session})
        Usermodel.places.push(createdPlace);
        await Usermodel.save({session : session})
        await session.commitTransaction()
    }
    catch(err)
    {   
        const Error = new HttpError('Error in adding new place', 500)
        return next(Error)
    }


    res.status(201).json({place: createdPlace})
}

const updatePlace = async (req, res, next) => {
    const validationError = validationResult(req)
    let place;
    if(!validationError.isEmpty())
    {
        throw new HttpError("could not update place, please check your inputs.. some fields are invalid", 422)
    }
    const {title, description} = req.body;
    const placeId = req.params.pid;
    try
    {
        place = await Placemodel.findById(placeId)
    }
    catch(err)
    {
        return next (new HttpError ('Something went wrong, please try again later', 500))
    }

    if(!place)
    {
        return next(new HttpError ('Could not update place for the provided id', 404))
    }
    place.title = title
    place.description = description
    try
    {
        await place.save()
    }
    catch(err)
    {
        return (new HttpError ('Something went wrong, please try again later', 500))
    }
    res.status(200).json({place: place.toObject({getters : true})})
    
}

const deletePlace = async (req, res, next) => {

    const placeId = req.params.pid;
    let place;
    try
    {
        place = await Placemodel.findById(placeId)
    }
    catch(err)
    {
        return next(new HttpError ('place doesnt exist, hence could not delete...', 422))
    }
    try
    {
        place.remove()
    }
    catch(err)
    {
        return next(new HttpError ('Something went wrong, please try again later', 500))
    }
    
    res.status(200).json({message: "Deleted Place..!"})

}


exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId 
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace