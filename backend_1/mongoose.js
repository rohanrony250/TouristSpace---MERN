const mongoose = require('mongoose')

const Product = require ('./models/product')

mongoose.connect("mongodb+srv://Rohan:6rztkqYYPCIm6ZkO@cluster0-touristspace.nmdjw.mongodb.net/products_test?retryWrites=true&w=majority")
.then(() => {
    console.log('connected to database')
}).catch(() => {
    console.log('connection to database failed')
})

const createProduct = async(req, res, next) => {

    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })

    const result = await createdProduct.save()
    res.json({message: result})
}

const getProduct = async (req,res,next) => {

    const result = await Product.find().exec()
    res.json(result)
}


exports.createProduct = createProduct
exports.getProduct = getProduct