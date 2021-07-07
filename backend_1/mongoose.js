const mongoose = require('mongoose')

const Product = require ('./models/product')

const createProduct = async(req, res, next) => {

    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })



}

const getProduct = async (req,res,next) => {

}


exports.createProduct = createProduct