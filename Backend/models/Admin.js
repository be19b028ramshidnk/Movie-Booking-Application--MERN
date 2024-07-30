import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required :true

    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    // there will be probably one or 2 admins
    addedMovies: [{
        // we need a referance to booking
        type: mongoose.Types.ObjectId,
        // we need to a referance to the collection
        ref:"Movie" ,//we need to the refer to the movie
    }]
});

export default mongoose.model("Admin",adminSchema)

