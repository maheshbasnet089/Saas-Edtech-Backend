import { NextFunction, Request, Response } from "express";

const catchAsync = (fn:Function) => {
    return (req:Request, res:Response, next:NextFunction) => {
      fn(req, res, next).catch((err:Error) => {
        return res.json({
          status: 500,
          message: err.message,
          fullError: err,
        });
      });
    };
  };

  export default catchAsync