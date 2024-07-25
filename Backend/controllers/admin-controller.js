import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export const addAdmin = async(req,res,next)=>{
    const {email, password} = req.body;
    // validation checking, if the the give values are empty
    if (!email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message:"Invalid Data"}) // unprocessible entities
    }
    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email})


    }
    catch(err){
        return console.log(err)
    }

    if (existingAdmin){
        return res.status(400).json({message:"Admin Already exist"})
    }
   
    let admin;
    const hashedPassword = bcrypt.hashSync(password) // this will help to encrypt the password
    // to store admin inthe database
    try{
        // this will have new admin
        admin = new Admin({email, password: hashedPassword});
        // await is important for database 
        admin = await admin.save(); 

    }
    catch(err){
        return console.log(err)
    }
    if (!admin){
        return res.status(500).json({message:"Unable to store admin"})
    }
    return res.status(201).json({admin})


}

export const adminLogin = async(req,res,next)=>{
    const {email, password} = req.body;
    // validation checking, if the the give values are empty
    if (!email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message:"Invalid Data"}) // unprocessible entities
    }

    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email})

    }
    catch(err){
        return console.log(err);
    }
    if (!existingAdmin){
        return res.status(400).json({message:"Admin not found"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingAdmin.password)

// if ispasswordcorrect is falsy value
    if (!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})

    }
    const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
        expiresIn:"2d",
        
    }) //providing payload and token generating

    return res.status(200).json({message:"Authentication Completed", token, id:existingAdmin._id})

}