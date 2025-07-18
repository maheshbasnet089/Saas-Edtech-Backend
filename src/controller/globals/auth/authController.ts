



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
import jwt from 'jsonwebtoken'
import generateJWTToken from "../../../services/generateJwtToken"
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

/*
login flow : 
email/username, password (basic)
email , password -- data accept --> validation --> 
// first check email exist or not (verify) --> yes --> check password now --> mil0--> 
token generation (jsonwebtoken)

--> now --> not registered 



google login, fb, github (oauth)
email login (SSO)

*/

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
         userName :username, 
         password : bcrypt.hashSync(password,12), //blowfish
         email : email
     })
     res.status(201).json({
         message : "User registered successfully"
     })
   }
   static async loginUser(req:Request,res:Response){
    const {email,password} = req.body 
    if(!email || !password){
        res.status(400).json({
            message : "Please provide email,password "
        })
        return
    }
    // check if email exist or not in our users table
    const data = await User.findAll({
        where : {
            email
        }
    }) 
    /*
    numbers = [1]
    numbers[0]
    data = [
    {
    email : "manish@gmail.com", 
    username : "manish", 
    password : "jldsjfslkfj3423423"
    }, 
     {
    email : "manish@gmail.com", 
    username : "manish", 
    haha : "hehe"
    }
    ]
    data[0].password 
    data[1].haha


    */
    // select * from User where email="manish@gmail.com" AND age = 22
    if(data.length ==0){
        res.status(404).json({
            message : "Not registered!!"
        })
    }else{
        // check password , nepal123 --> hash conversion --> fsdkjfsdfjsd
        // compare(plain password user bata aako password, hashed password register huda table ma baseko)
         const isPasswordMatch = bcrypt.compareSync(password,data[0].password)
         if(isPasswordMatch){
            // login vayo , token generation 
         const token = generateJWTToken({id:data[0].id})
            res.status(200).json({
                data : {
                    token : token, 
                    username : data[0].userName
                },
                message : "Logged in success"
            })
         }else{
            res.status(403).json({
                message : "Invalid email or password"
            })
         }

    }
   }
   
}



export default AuthController


// export  {registerUser}



// token(jwt), session
// cookie, localstorage