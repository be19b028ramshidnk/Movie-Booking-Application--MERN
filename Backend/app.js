import express from 'express'; // require is used for import statements
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes.js';
dotenv.config();
const app = express();


//user models and controllers

//define the middlewares
app.use(express.json()) // this tells that this app will only use json data
app.use("/user",userRouter)


//connect to server and database
mongoose.connect(
    'mongodb+srv://admin:mongoramshi@cluster0.fanlgco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(()=>
    app.listen(5000,()=>
    console.log("Connected to database and Server is running")
)).catch(e=>console.log(e));


 
