import sgmail from "../configs/sendgrid";

export const sendEmailService = async (
    to:string,
    subject:string,
    text:string

) =>{
    const msg = {
        
        to,
        from: process.env.SENDER_EMAIL as string,
        subject,
        text,
    };

    try{
        console.log(to,subject,text)
        await sgmail.send(msg);
       
    }catch (error){
        console.error("Sendgrid Error",error);
        throw error;
    }
};