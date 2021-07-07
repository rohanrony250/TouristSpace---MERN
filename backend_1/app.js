const express = require('express')
const bodyParser = require('body-parser')
const mongoTest = require('./mongo')
const app = express()

app.use(bodyParser.json())

app.post('/products', mongoTest.createProduct)
app.get('/products', mongoTest.getProducts)
app.listen(6000)