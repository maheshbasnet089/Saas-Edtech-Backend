import { Request } from "express";



export interface IExtendedRequest extends Request{
       user ?: {
       id : string,
<<<<<<< HEAD
       currentInstituteNumber ?: string | number | null
       } 
=======
       currentInstituteNumber ?: string | number | null 
       }
>>>>>>> c8baac57fc301208e6dc326b40bdf4dbcb8b7cd8
      
}