const mongoose = require('mongoose')
// schema initialization

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price : { type: Number, required: true}
})

// model initialization && export

module.exports = mongoose.model('product', productSchema)


