import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";




const instituteListForStudent = async(req:Request,res:Response)=>{

  const tables = await sequelize.query(`SHOW TABLES LIKE 'institute_%'`,{
    type : QueryTypes.SHOWTABLES
  })
//   console.log(tables,"Tables")
  let allDatas = []
 for(let table of tables){
    console.log(table)
    // table --> institute_1234,institute_3434, 
    const instituteNumber = table.split("_")[1]
   const [data] =  await sequelize.query(`SELECT instituteName, institutePhoneNumber FROM ${table}`,{
        type : QueryTypes.SELECT
    })

    allDatas.push({instituteNumber : instituteNumber,...data})
 }
  res.status(200).json({
    message : "data fetched", data : allDatas
  })

}
const instituteCourseListForStudent = async(req:Request,res:Response)=>{
    const {instituteId} = req.params
    const datas = await sequelize.query(`SELECT * FROM course_${instituteId} JOIN category_${instituteId} ON course_${instituteId}.categoryId = category_${instituteId}.id`,{
        type : QueryTypes.SELECT
    })
    console.log(datas.length)
    if(datas.length == 0){
        res.status(404).json({
            message : "No courses found of that institute"
        })
    }else{

        res.status(200).json({
            message : "Courses fetched", data : datas
        })
    }
}


export  {instituteListForStudent, instituteCourseListForStudent}