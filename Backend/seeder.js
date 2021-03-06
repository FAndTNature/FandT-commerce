const mongoose = require('mongoose')
const dotenv = require('dotenv')
const products = require('./data/products')
const users = require('./data/user')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const importData = async () => {
    try {
        // await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProduct = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProduct)

        console.log('Data Added!!!')
        process.exit()

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        // await User.deleteMany()

        console.log('Data removed!!!')
        process.exit()
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}