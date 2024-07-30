// here we can define a function

import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async(req,res,next)=>{
    // need to define a new booking
    const {movie,date,seatNumber,user} = req.body 

    // we need to vallidate both movie and user
    // first we need to check whether the movie existing there or not
    let existingMovie;
    let existingUser;
    // why we are using try catch block because database operation sometimes fail
    try{
        existingMovie  = await Movie.findById(movie);
        existingUser = await User.findById(user);

    }
    catch(err){
        return console.log(err)
    }
    if (!existingMovie){
        return res.status(404).json({message:"Movie not found"})
    }
    if(!existingUser){
        return res.status(404).json({message:"User not found"})
    }

    let booking;// now undefined value
    try{

        booking = new Bookings({movie,user,seatNumber,date : new Date(`${date}`)});
        // we can create a section that help to save booking into respective user and movie
        const session = await mongoose.startSession();
        //create new transation
        session.startTransaction({});
        // we need to push booking to the user aswell
        existingUser.bookings.push(booking)// we will send the newly created booking
        existingMovie.bookings.push(booking)
        await existingMovie.save({session}) // we need to store to the same session
        await existingUser.save({session})
        await booking.save({session}); // help to save inside the database
        session.commitTransaction()

    }
    catch (err){
        return console.log(err)

    }
    if (!booking){
        // if newbooking is a falsy value
        return res.status(500).json({message:"Unable to create a booking"})
    }
    return res.status(201).json({booking})
}

export const getBookingbyId = async (req,res,next)=>{
    const id = req.params.id;
    let booking;//undefined value
    try{
        booking = await Bookings.findById(id);


    }
    catch (err){
        return console.log(err)
    }
    if(!booking){
        return res.status(500).json({message:"Unexpected error"})

    }
    return res.status(200).json({booking})
}


export const deleteBooking = async(req,res,next)=>{
    const id =req.params.id;
    let mybooking;
    try{
        // we need to delete from the movies and user aswell
        mybooking = await Bookings.findByIdAndDelete({ _id: id }).populate('user movie'); // populate collect thre referance data aswell 
        console.log(mybooking);
        if (!mybooking) {
            return res.status(500).json({ message: 'Error deleting booking' });
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        await mybooking.user.bookings.pull(mybooking); // pull will help to removie booking details of user  
        await mybooking.movie.bookings.pull(mybooking); // pull will help to removie booking details of user  

        // the we need to save the chancges
        await mybooking.user.save({session});
        await mybooking.movie.save({session});

        // now we can commit the transation
        session.commitTransaction(); 

    }
    catch (err){
        return console.log(err)
    }

    
    

    
    return res.status(200).json({message:"Scessfully Deleted Booking"})
}