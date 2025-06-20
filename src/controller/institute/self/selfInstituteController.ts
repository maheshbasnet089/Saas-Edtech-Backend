import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import {QueryTypes} from 'sequelize'
import { Response } from "express";

interface IInstituteNumber{
    instituteNumber : number
}

const getMyInstitutes = async (req: IExtendedRequest, res: Response) => {
    const userId = req.user?.id;
  
    const unOrganizedInstituteNumbers: IInstituteNumber[] = await sequelize.query(
      `SELECT instituteNumber FROM user_institute WHERE userId = ?`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
  
    // Use Promise.all to fetch all institutes concurrently
    const organizationDatas = await Promise.all(
      unOrganizedInstituteNumbers.map(async (instituteObject) => {
        const institute = await sequelize.query(
          `SELECT * FROM institute_${instituteObject.instituteNumber}`,
          { type: QueryTypes.SELECT }
        );
        return institute; // This is an array, from SELECT query
      })
    );
  
    // Flatten the array of arrays
    const flatData = organizationDatas.flat();
  
    res.status(200).json({
      message: "Institute fetched",
      data: flatData,
    });
  };
  
const getMyCurrentOrganization = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber; 
    const userId = req.user?.id 
   const datas =   await sequelize.query(`SELECT * FROM user_institute WHERE instituteNumber = ? AND userId=?`,{
        replacements : [instituteNumber,userId], 
        type : QueryTypes.SELECT
    })
    if(datas.length === 0){
        res.status(400).json({
            message : "you dont have access to view this organization"
        })
    }else{
       const datas =  await sequelize.query(`SELECT * FROM institute_${instituteNumber}`,{
            type : QueryTypes.SELECT
        })
        res.status(200).json({
            message : "fetched",
            data : datas
        })
    }
   
}

const changeMyOrganization = async(req:IExtendedRequest,res:Response)=>{
    const userId = req.user?.id; 
    const currentInsituteNumber = req.user?.currentInstituteNumber
    const instituteNumber =req.body.instituteNumber; 
    if(!instituteNumber) return res.status(400).json({message : "please provide instituteNumber"})
    const datas =   await sequelize.query(`SELECT * FROM user_institute WHERE instituteNumber = ? AND userId=?`,{
        replacements : [instituteNumber,userId], 
        type : QueryTypes.SELECT
    })
    if(datas.length === 0){
        res.status(400).json({
            message : "you dont have access to view this organization"
        })
    }else{
        await sequelize.query(`UPDATE users SET currentInstituteNumber=? WHERE id=?`,{
            replacements : [instituteNumber,userId], 
            type : QueryTypes.UPDATE
        })
        res.status(200).json({
            message : "updated successfully",
        })
    }
}

export {getMyInstitutes,getMyCurrentOrganization,changeMyOrganization}