



/*

REGISTER/SIGNUP
incoming data  --> username, email, password 
processing/checking --> email valid, compulsory data aaaunu paryo 
db--> table--> query --> table ma insert/read/delete/update

LOGIN/SIGNIN
LOGOUT
FORGOT PASSWORD 
RESET PASSWORD/ OTP

*/

import {Request,Response} from "express"
import User from "../../../database/models/user.model"
import bcrypt from "bcrypt"

// json data --> req.body // username,email,password 
// files --> req.file // files
// const registerUser = async (req:Request,res:Response)=>{
// //    const username = req.body.username
// //    const password = req.body.password
// //    const email = req.body.email
//     // incoming data --> accept
//    const {username,password,email} = req.body
//    if(!username || !password || !email){
//      res.status(400).json({
//         message : "Please provide username, password, email"
//     })
//     return
//    }
//     // insert into Users table 
//     await User.create({
//         username :username, 
//         password : password, 
//         email : email
//     })
//     res.status(200).json({
//         message : "User registered successfully"
//     })
   

// } // function 
// BOLA Attack


class AuthController{
   static async registerUser(req:Request,res:Response){
    if(req.body == undefined){
        console.log("triggereed")
        res.status(400).json({
            message  : "No data was sent!!"
        })
        return
    }
    const {username,password,email} = req.body
    if(!username || !password || !email){
      res.status(400).json({
         message : "Please provide username, password, email"
     })
     return
    }
//    const [data] =  await User.findAll({
//         where : {
//             email
//         }
//     })
//     if(data){
//         // already exists with that email 
//     }
     // insert into Users table 
     await User.create({
         username :username, 
         password : bcrypt.hashSync(password,12), 
         email : email
     })
     res.status(201).json({
         message : "User registered successfully"
     })
   }
}

export default AuthController


// export  {registerUser}

