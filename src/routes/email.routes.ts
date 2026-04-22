import  {Router} from "express";
import { body } from "express-validator";
import {sendmail} from "../controllers/email.controller";

const router = Router();

router.post("/send-email",[
    body("to")
    .isEmail()
    .withMessage("Valid email is required"),

    body("subject")
    .notEmpty()
    .withMessage("Subject is required"),

    body("text")
    .notEmpty()
    .withMessage("Message cannot be empty")
],sendmail);

export default router;