const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')
const connectDB = require('./config/db')

const app = express()
dotenv.config()
connectDB()

const port = process.env.PORT || 6000


app.get('/', (req, res) => {
    res.send('Up') 
})

app.get('/api/products', (req, res) => {
    res.json(products) 
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(id => id._id === req.params.id)
    res.json(product) 
})

app.listen(port, () => console.log(`listening on ${port}`))
