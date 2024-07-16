import express from 'express'; // require is used for import statements
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//connect to server and database
mongoose.connect(
    'mongodb+srv://admin:${process.env.MONGODB}@cluster0.fanlgco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(()=>app.listen(5000,()=>{
    console.log("Connected to database and Server is running")}
)).catch(e=>console.log(e));



