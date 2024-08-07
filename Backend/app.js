import express from 'express'; // require is used for import statements
import mongoose from 'mongoose';
import 'dotenv/config'
import userRouter from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';
import bookingRouter from './routes/booking-routes.js';
import cors from 'cors';


const app = express();



//user models and controllers

//define the middlewares
app.use(cors());
app.use(express.json()) // this tells that this app will only use json data
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter)
app.use("/booking", bookingRouter)
  
  
  // Your API routes
  




//connect to server and database
mongoose.connect(
    'mongodb+srv://admin:mongoramshi@cluster0.fanlgco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(()=>
    app.listen(5000,()=>
    console.log("Connected to database and Server is running")
)).catch(e=>console.log(e));


 
