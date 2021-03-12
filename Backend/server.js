const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()
dotenv.config()
connectDB()

const port = process.env.PORT || 6000

app.use(cors())
app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => { res.send('API is Up....') })


app.listen(port, () => console.log(`listening on ${port}`))
