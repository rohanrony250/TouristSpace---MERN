const MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://Rohan:6rztkqYYPCIm6ZkO@cluster0-touristspace.nmdjw.mongodb.net/products_test?retryWrites=true&w=majority";


const createProduct = async (req, res, next) => {

    const newProduct = {
        name: req.body.name,
        price: req.body.price
    }
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

    try{
        await client.connect()
        const db = client.db()
        const result = await db.collection('products').insertOne(newProduct)
    }catch (error){
        
        console.log(error)
        return res.json({message: "Could not store data"})
    }

    client.close()
    res.json(newProduct);
}

const getProducts = async (req, res, next) => {

    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
    let result
    try
    {
        await client.connect()
        const db = client.db()
        result = await db.collection('products').find().toArray()
    }catch(err)
    {
        return res.json({message: "Could not retrieve products"})
    }
    client.close()

    res.json(result)
}

exports.createProduct = createProduct
exports.getProducts = getProducts 