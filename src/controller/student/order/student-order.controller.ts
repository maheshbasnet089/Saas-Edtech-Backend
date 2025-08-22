import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import User from "../../../database/models/user.model";
import { IExtendedRequest } from "../../../middleware/type";
import { Response } from "express";
import { getSequelizeTypeByDesignType } from "sequelize-typescript";
import { KhaltiPayment } from "./paymentIntegration";
import axios from "axios";

// upload.fields([{ name: 'avatar1', maxCount: 1 }, {name:'avatar2', maxCount:1},{name:'avatar3', maxCount : 1}]

//


enum PaymentMethod{
    COD = "cod", 
    ESEWA = "esewa", 
    KHALTI = "khalti"
}


enum VerificationStatus{
    Completed = "Completed", 

}

const createStudentCourseOrder = async(req:IExtendedRequest,res:Response)=>{
    const userId = req.user?.id 
    console.log(userId,"UserID")
    const notChangedUserId = req.user?.id.split("_").join("-")
    const userData = await User.findByPk(notChangedUserId)
    const {whatsapp_no, remarks,paymentMethod, amount} = req.body 
    const orderDetailsData:{
        courseId : string , 
        instituteId : string
    }[] = req.body.orderDetails
    if(orderDetailsData.length === 0 ) return res.status(400).json({
        message : "Please send the course you want to purchase!!!"
    })

    if(!whatsapp_no || !remarks){
        return res.status(400).json({
            message : "Please provide whatsapp_no, remarks"
        })
    }

    /*

    whatsapp no, payment({
    paymentMethod : cod|esewa|khalti, 
    paymentStatus : paid|unpaid|pending
    })

    MERN STACK = 

    [
    {
    courseId : "Mernstack_123123", 
    instituteId : "123123"
    },{
    cousreId : "laravel_123123",
    instituteId : "123123"
    }
    ]


    */
   await sequelize.query(`CREATE TABLE IF NOT EXISTS student_order_${userId}(
            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            email VARCHAR(25) NOT NULL,
            whatsapp_no VARCHAR(26) NOT NULL, 
            remarks TEXT, 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`)

    // order-details 
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_order_details_${userId}(
          id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            courseId VARCHAR(36) , 
            instituteId VARCHAR(36), 
            orderId VARCHAR(100),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_payment_${userId}(
         id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            paymentMethod ENUM('esewa','khalti','cod'), 
            pidx VARCHAR(26),
            paymentStatus ENUM('paid','pending','unpaid') DEFAULT('unpaid'),
            totalAmount VARCHAR(10) NOT NULL,
            orderId VARCHAR(100), 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
        // insert query 
        console.log(userData,"userData")
       const data =  await sequelize.query(`INSERT INTO student_order_${userId}(whatsapp_no,remarks,email) VALUES(?,?,?)`,{
            type  : QueryTypes.INSERT, 
            replacements : [whatsapp_no,remarks,userData?.email]
        })
    const [result]: {id : {
        id : string
    }}[] =  await sequelize.query(`SELECT id FROM student_order_${userId} WHERE whatsapp_no = ? AND remarks = ?`,{
        type : QueryTypes.SELECT, 
        replacements : [whatsapp_no,remarks]
     })
    
     console.log(result.id,"Result")
        console.log(data,"Dataaaaa")
        for(let orderDetail of orderDetailsData){
            await sequelize.query(`INSERT INTO student_order_details_${userId}(courseId,instituteId, orderId) VALUES(?,?,?)`,{
                type : QueryTypes.INSERT, 
                replacements : [orderDetail.courseId,orderDetail.instituteId, result.id]
            })
        }
    
        let pidx; 
        if(paymentMethod === PaymentMethod.ESEWA){

            // esewa integration function call here 
        }else if(paymentMethod === PaymentMethod.KHALTI){
            // khalti integration function call here 
         const response = await KhaltiPayment({
            amount : amount, 
            return_url : "http://localhost:3000/", 
            website_url : "http://localhost:3000/", 
            purchase_order_id : orderDetailsData[0].courseId, 
            purchase_order_name : "Order_" + orderDetailsData[0].courseId
         })
         if(response.status === 200){
            pidx = response.data.pidx
             res.status(200).json({
                 message : "Takethis", 
                 data : response.data
                })
            }else{
                res.status(200).json({
                    message : "Something went wrong, try again !!"
                })
            }


        }else if(paymentMethod === PaymentMethod.COD){
            // khalti integration function call here
        }else{
            // stripe 
        }
    await sequelize.query(`INSERT INTO student_payment_${userId}(paymentMethod,totalAmount,orderId,pidx) VALUES(?,?,?,?)`,{
            type : QueryTypes.INSERT, 
            replacements : [paymentMethod,amount,result.id,pidx]
        })

}


const studentCoursePaymentVerification = async(req:IExtendedRequest,res:Response)=>{
    const {pidx} = req.body 
    const userId = req.user?.id 

    if(!pidx) return res.status(400).json({message : "Please provide pidx"})
        const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx},{
    headers:{
        Authorization : "Key b68b4f0f4aa84599ad9b91c475ed6833"
    }})
    const data = response.data 
    if(data.status === VerificationStatus.Completed){
        await sequelize.query(`UPDATE student_payment_${userId} SET paymentStatus=? WHERE pidx=?`,{
            type : QueryTypes.UPDATE, 
            replacements : ['paid',pidx]
        })
        res.status(200).json({
            message : "Payment verified successfully"
        })
    }else{
        res.status(500).json({
            message : "Payment not verified!!"
        })
    }
}

export {createStudentCourseOrder,studentCoursePaymentVerification}