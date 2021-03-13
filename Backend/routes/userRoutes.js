const express = require('express')
const { getUsers, getUserProfile, registerUsers } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerUsers)
router.post('/login', getUsers)
router.route('/profile').get(protect, getUserProfile)

module.exports = router