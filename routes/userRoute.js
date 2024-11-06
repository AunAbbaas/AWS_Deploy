const express = require('express')
const { signin, signup ,getUser,getUserById,deleteUser,updateUser} = require('../controllers/userController')
const userRoute = express.Router()



userRoute.post('/signup',signup)
userRoute.post('/signin',signin)
userRoute.get('/UserApi',getUser)
userRoute.get('/UserApi',getUserById)
userRoute.delete('/UserApi',deleteUser)
userRoute.put('/UserApi',updateUser)


module.exports = userRoute