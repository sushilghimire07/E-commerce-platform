import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors  from 'cors'
import authRouter from './routes/auth/auth-route.js'

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(
    ()=>{
        console.log("Databse connected sucesfully...!!")
    }
).catch((error)=>{
    console.log("Error while connecting to database..!! "+error)
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "pragma"
        ],credentials:true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter)

app.listen(PORT,()=>{
 console.log(`Server is running on port : ${PORT}`)
}) 

