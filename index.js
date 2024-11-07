const express = require('express')
const userRoute = require('./routes/userRoute.js')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()


const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/v1/user',userRoute)
app.get('/api/get',(req,res)=>{
    res.send({message:"Server is Running"});
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Database Connected!')
    app.listen(process.env.PORT,()=>{
        console.log('Server is Running!')
    })
}).catch((err)=>{
    console.log(err)
})

