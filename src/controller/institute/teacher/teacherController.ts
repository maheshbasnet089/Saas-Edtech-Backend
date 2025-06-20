import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateTeacherPassword from "../../../services/generateTeacherPassword";



const createTeacher = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber; 
    const {teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary,courseId} = req.body
    const teacherPhoto = req.file ? req.file.path : null 
    if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExpertise || !joinedDate || !salary || !courseId){
        return res.status(400).json({
            message : "Please provide teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary "
        })
    }

    await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary,teacherPhoto,teacherPassword,courseId,instituteNumber) VALUES(?,?,?,?,?,?,?,?,?,?)`,{
        type : QueryTypes.INSERT, 
        replacements : [teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary,teacherPhoto,generateTeacherPassword(teacherName),courseId,instituteNumber]
    })

    // send mail here 
    res.status(200).json({
        message : "teacher created successfully"
    })

}

export {createTeacher}