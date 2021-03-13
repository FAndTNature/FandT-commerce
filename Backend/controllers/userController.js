const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const generateToken = require('../utils/generateToken')

const getUsers = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})

const registerUsers = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })

    if(!userExist) {
        const user = await User.create({
            name,
            email,
            password
        })
        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id) 
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid Data')
        }
    }
    else {
        res.status(400)
        throw new Error('User exists')
    }

})

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin 
        })
    }
    else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

module.exports = { getUsers, getUserProfile, registerUsers }