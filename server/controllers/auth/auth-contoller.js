 import bcrypt from 'bcryptjs'
 import jwt from 'jsonwebtoken'
 import User from '../../models/User.js'
 
 // register
const registerUser = async(req,res)=>{
    const {userName , email , password} = req.body;

    try {
        
        const hashPassword =await bcrypt.hash(password,10);
        const newUser = new User({
            userName,email,password:hashPassword
        })
        
        await newUser.save();
        res.status(200).json({
            sucess:true,
            message:"Registration Sucesfull..!!"
        })
        
    } catch (error) {
        console.log("Error in authcontroller register "+error);
        res.status(500).json({
            sucess:false,
            message:"Some error occured..!!"
        })
        
    }

}





 //login
const login = async(req,res)=>{
    const {} = req.body;

    try {

        
        
    } catch (error) {
        console.log("Error in authcontroller login "+error);
        res.status(500).json({
            sucess:false,
            message:"Some error occured..!!"
        })
        
    }
}






 //logout



 //auth middleware

 export { registerUser};