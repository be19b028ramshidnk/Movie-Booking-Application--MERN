// router can help to GET, POST router
import express from "express";
import { deleteUser, getAllUsers, getBookingofUser, login, signup, updateUser } from "../controllers/user-controller.js";



//define the router
const userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.post("/signup", signup); // adding the user address
userRouter.put("/:id", updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login) // frontend work
userRouter.get("/bookings/:id", getBookingofUser)


export default userRouter; // we have to export this for use it on app.js