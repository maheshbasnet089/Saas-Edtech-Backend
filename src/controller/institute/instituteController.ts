import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInsituteNumber from "../../services/generateRandomInsituteNumber";


interface IExtendedRequest extends Request{
    user?: {
        name : string, 
        age : number 
    }
}

const createInstitute = async (req:IExtendedRequest,res:Response,next:NextFunction)=>{
        // console.log("Triggered")
        console.log(req.user ,"Name from middleware")
        const {instituteName,instituteEmail,institutePhoneNumber,instituteAddress} = req.body 
        const instituteVatNo = req.body.instituteVatNo || null 
        const institutePanNo = req.body.institutePanNo || null
        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message : "Please provide instituteName,instituteEmail, institutePhoneNumber,  instituteAddress "
            })
            return
        }

        // aayo vane - insitute create garnu paryo --> insitute_123123, course_123132 
        // institute (name)

        const instituteNumber =   generateRandomInsituteNumber()  
       await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            instituteName VARCHAR(255) NOT NULL, 
            instituteEmail VARCHAR(255) NOT NULL UNIQUE, 
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE, 
            instituteAddress VARCHAR(255) NOT NULL, 
            institutePanNo VARCHAR(255), 
            instituteVatNo VARCHAR(255), 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)

        await sequelize.query(`INSERT INTO institute_${instituteNumber}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,{
            replacements : [instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo]
        })

        
        next()
    }


const createTeacherTable = (req:Request,res:Response)=>{
            // await sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
            // id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            // teacherName VARCHAR(255) NOT NULL, 
            // teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
            // teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE
            // )`)
   
}
export default createInstitute
