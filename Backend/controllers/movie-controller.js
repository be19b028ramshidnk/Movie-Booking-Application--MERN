import jwt from 'jsonwebtoken'
import Movie from '../models/Movie.js';
export const addMovie = async(req,res,next)=>{
    // we need to validate the token aswell
    //if the token is still valid, then only we can able to add movie
    const extractedToken =req.headers.authorization.split(" ")[1]; // token will send as the bearer token, the second position will give the token
    // if we dont have the token
    if(!extractedToken || extractedToken.trim()===""){
        return res.status(404).json({message:"Token is not found"})
    }
    //if we got the token,
    let adminId;
    // we will find the admin id from the token
    // we can store this admin id 
    
    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY,(err,decrypted)=>{ // the last one is callback error
        if (err){
            return res.status(400).json({message:`${err.message}` })
        }
        else{
            adminId = decrypted.id;
            return;
        }

    })

    //create new movie
    // we have to destructure these things

    const {title,description,releaseDate,posterUrl,featured, actors } = req.body; // these are the things we need to get from the frontend
    req.body;

    if (!title || title.trim() ==="" || !description || description.trim() ==="" || !posterUrl || posterUrl.trim()===""){
        return res.status(422).json({message:"Invalid Inputs, Kindly check it"})

        }
    
    let movie; 
    //try catch block
    try{
        movie = new Movie({title,description,releaseDate: new Date(`${releaseDate}`) ,featured,actors,posterUrl,admin:adminId})
        movie = await  movie.save();

    }
    catch(err){
        return console.log(err)
    }

    if (!movie){
        return res.status(500).json({message:"Your request failed"})
    }
    //if we passed the validation check, we can return
    return res.status(201).json({movie})


} 