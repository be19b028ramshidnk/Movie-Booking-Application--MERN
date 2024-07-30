import mongoose from "mongoose";


// booking have to be connected to both movie and user
const bookingSchema =new mongoose.Schema({
    movie:{
        type: mongoose.Types.ObjectId,
        ref:"Movie",
        required: true
    },
    date:{
        type: Date,
        required:true
    },
    seatNumber:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User", // referance to the user
        required:true
    }
})

export default mongoose.model("Bookings", bookingSchema)