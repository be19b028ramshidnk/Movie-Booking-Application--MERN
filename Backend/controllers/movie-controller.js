export const addMovie = async(req,res,next)=>{
    // we need to validate the token aswell
    //if the token is still valid, then only we can able to add movie
    const extractedToken =req.headers.authorization; // token will send as the bearer token
    // if we dont have the token
    if(!extractedToken || extractedToken.trim()===""){
        return res.status(404).json({message:"Token is not found"})
    }
    //if we got the token,
    console.log(extractedToken)


}