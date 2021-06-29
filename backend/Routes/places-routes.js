//to include express in more than one file its important to import it in every file.
//register places-middleWare here

const express = require('express')
const PlacesControllers = require("../controllers/places-controllers")


const router = express.Router();


router.get('/:pid', PlacesControllers.getPlaceById)
router.get('/user/:uid', PlacesControllers.getPlacesByUserId)
router.post('/', PlacesControllers.createPlace)
router.patch('/:pid', PlacesControllers.updatePlace)
router.delete('/:pid', PlacesControllers.deletePlace)
module.exports = router;