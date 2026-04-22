import { Request,Response } from "express";
import { validationResult } from "express-validator";
import {sendEmailService} from "../services/email.service"

// export class EmailController{

//     public sendMail(){

//     }

// }

// new EmailController().sendMail();

export const sendmail = async (req:Request , res:Response) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({
            errors: errors.array()
        })
    }


    try{
        const {to , subject , text} = req.body;

        await sendEmailService(to,subject,text);

        return res.status(200).json({
            message : "Email Send Successfully"
        });
    }catch(err){
        res.status(500).json({
            message : "Something occured"
        });
    }
}