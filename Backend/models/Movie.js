import mongoose from "mongoose";

// here also we have to create new schema
const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,

    },

    description: {
        type:String,
        required:true,
        
    },

    actors:[{type:String,
        required:true,}],

    releaseDate: {
        type:Date,
        required:true,
        
    },
    posterUrl: {
        type:String,
        required:true,
        
    },
    featured:{
        type:Boolean
    },
    //bookings stored inside an array
    bookings:[{type:mongoose.Types.ObjectId, ref: "Bookings"}],
    // we need to know, which admin is created this movie
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
        required:true
    }
})

export default mongoose.model("Movie", movieSchema)