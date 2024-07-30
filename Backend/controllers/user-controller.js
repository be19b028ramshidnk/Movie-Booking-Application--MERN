import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const getAllUsers = async(req,res,next)=>{
    let users;
    try {
        users = await User.find() // mongodb find all of the document for that query
    }
    catch (err){
        return console.log(err);
        // checking the error, becuse it is a database opperatioon, it can fail aswell
    }

    if (!users){
        return res.status(500).json({message:"Unexpected error occured"}) // 500 as the internal server error
    }

    return res.status(200).json({users}) // if we pass the error, we can respond, its sucessfull
}


// post controller function
export const signup = async(req,res,next) =>{

    const {name,email,password} =req.body;

    if (!name || name.trim()==="" || !email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message:"Invalid Data"}) // unprocessible entities

        // after checking the validation , we can createa new user
    }

    // checking the password
    const hashedPassword = bcrypt.hashSync(password)

    let user;
    try {
        user = new User({name,email,password: hashedPassword});
        user = await user.save();

    }
    // validation checking
    catch(err){
        return console.log(err);
    }
    if (!user){
        return res.status(500).json({message:"Unexpected error"})
    }
    return res.status(201).json({user}) // post newely created user

}

export const updateUser = async(req,res,next)=>{
    const id = req.params.id; // we can get id of user
    const {name,email,password} =req.body;

    if (!name || name.trim()==="" || !email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message:"Invalid Data"}) // unprocessible entities

        // after checking the validation , we can createa new user
    }
    const hashedPassword = bcrypt.hashSync(password)

    let user;
    // we can do try catch block
    try {
        user = await User.findByIdAndUpdate(id,{name,email, password:hashedPassword})

    } 
    catch (errr) {
        return console.log(errr)

    }
    if (!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(200).json({message:"Updated Successfully"})
}

export const deleteUser = async(req,res,name)=>{
    const id = req.params.id; // we can get id of user
    let user;
    try{
        user = await User.findByIdAndDelete(id)

    }
    catch(err){
        return console.log(err)

    }
    if (!user){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(200).json({message:"Delete Successfully"})


}

export const login = async(req,res,next)=>{
    const {email,password} =req.body;

    if ( !email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message:"Invalid Data"})
    }
    let existingUser;
    try{
        existingUser=await User.findOne({email})

    }
    catch(err){
        return console.log(err)

    }
    if (!existingUser) {
        return res.status(404).json({message:"No account found in this email id"})

    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Password is Incorrect"})
    }

    return res.status(200).json({message:"Login Sucessfully"})
}

export const getBookingofUser = async(req,res,next)=>{
    const id = req.parms.id;
    let bookings;
    try{
        bookings = await Bookings.find({user:id})
    }catch(err){
        return console.log(err)
    }
    if (!bookings){
        return res.status(500).json({message:"Unable to get Bookings"})
    }
    return res.status(200).json({bookings})
}