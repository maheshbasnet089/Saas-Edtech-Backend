import { Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import { QueryTypes } from "sequelize";





const insertIntoCartTableOfStudent = async(req:IExtendedRequest,res:Response)=>{
    const userId = req.user?.id
    console.log(userId,"userId")
    const {instituteId,courseId} = req.body 
    if(!instituteId || !courseId) {
        return res.status(400).json({
            message : "Please provide instituteId"
        })
    }

    // await sequelize.query(`CREATE TABLE IF NOT EXISTS student_cart_courses_${userId}(
    //            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
    //            courseName VARCHAR(255) NOT NULL, 
    //            coursePrice VARCHAR(20) NOT NULL, 
    //            courseDescription TEXT NOT NULL,
    //     )`,{)

    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_cart_${userId}(
               id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            courseId VARCHAR(36) REFERENCES course_${instituteId}(id),
            instituteId VARCHAR(36) REFERENCES institute_${instituteId}(id), 
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
              updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
    await sequelize.query(`INSERT INTO student_cart_${userId}(courseId,instituteId) VALUES(?,?)`,{
        type : QueryTypes.INSERT, 
        replacements : [courseId,instituteId]
    })
    res.status(200).json({
        message : "Course added to cart"
    })
}

const fetchStudentCartItems = async(req:IExtendedRequest,res:Response)=>{
    const userId = req.user?.id 

    // await sequelize.query(`SELECT * FROM student_cart_${userId} AS SC JOIN course_${}`,{
    //     type : QueryTypes.SELECT
    // })
    let cartDatas = []
    const datas :{instituteId : string, courseId : string}[] = await sequelize.query(`SELECT courseId,instituteId FROM student_cart_${userId}`,{
        type : QueryTypes.SELECT
    })
    for(let data of datas){
        //69237346-4d84-11f0-ad8d-3e73c3890034
    const test =  await sequelize.query(`SELECT * FROM course_${data.instituteId} WHERE id='${data.courseId}'`,{
        type : QueryTypes.SELECT
    })
    console.log(test)
    cartDatas.push(...test)
    }
    res.status(200).json({
        message : "Cart fetchd", data : cartDatas
    })

    // if(data.length === 0){
    //     res.status(404).json({
    //         message : "No item in the cart"
    //     })
    // }else{
    //     res.status(200).json({
    //         message : "Cart items fetched", 
    //         data
    //     })
    // }
}


export {insertIntoCartTableOfStudent,fetchStudentCartItems}