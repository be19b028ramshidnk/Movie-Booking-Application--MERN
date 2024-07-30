import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:4,
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Bookings"
    }]


})

// now we need to export the schema
 export default mongoose.model("User",userSchema)
