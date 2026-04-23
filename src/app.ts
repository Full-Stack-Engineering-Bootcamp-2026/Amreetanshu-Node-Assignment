import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import emailRoutes from "./routes/email.routes";
import fileRoutes from "./routes/file.routes";
import UserPageRoutes from "./routes/UserPage.routes"
import { connectDB } from "./utils/Database";

connectDB();


const app = express();


app.use(express.json());


console.log("SENDGRID KEY:", process.env.SENDGRID_API_KEY);
console.log("SENDER EMAIL:", process.env.SENDER_EMAIL);


app.use("/", emailRoutes);
app.use("/",fileRoutes);
app.use("/",UserPageRoutes)


app.get("/", (req, res) => {
  res.send("API is running ");
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});