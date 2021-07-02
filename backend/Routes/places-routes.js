//to include express in more than one file its important to import it in every file.
//register places-middleWare here

const express = require('express')
const PlacesControllers = require("../controllers/places-controllers")
const { check } = require ('express-validator')

const router = express.Router();


router.get('/:pid', PlacesControllers.getPlaceById)
router.get('/user/:uid', PlacesControllers.getPlacesByUserId)
router.post('/',[check('title').not().isEmpty(), check('description').isLength({min: 5}), check('address').not().isEmpty()] , PlacesControllers.createPlace)
router.patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({min : 5})] , PlacesControllers.updatePlace)
router.delete('/:pid', PlacesControllers.deletePlace)
module.exports = router;