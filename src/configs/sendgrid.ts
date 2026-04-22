import sgmail from "@sendgrid/mail";

sgmail.setApiKey(process.env.SENDGRID_API_KEY?.trim() as string);

export default sgmail;