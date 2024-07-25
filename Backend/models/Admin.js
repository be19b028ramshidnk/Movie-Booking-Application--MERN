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
        type:String
    }]
});

export default mongoose.model("Admin",adminSchema)

