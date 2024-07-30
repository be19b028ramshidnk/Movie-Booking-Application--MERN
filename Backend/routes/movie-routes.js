import express from "express";
import { addMovie, getAllMovies, getMovieById } from "../controllers/movie-controller.js";
const movieRouter = express.Router()


//to get movie from the database-GET then we have to insert getmovies inside the controller
movieRouter.get("/",getAllMovies)
movieRouter.get("/:id",getMovieById)


//to add movie to the database
movieRouter.post("/",addMovie)

export default movieRouter;