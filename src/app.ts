import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import emailRoutes from "./routes/email.routes";

const app = express();

// Middleware
app.use(express.json());


console.log("SENDGRID KEY:", process.env.SENDGRID_API_KEY);
console.log("SENDER EMAIL:", process.env.SENDER_EMAIL);

// Routes
app.use("/", emailRoutes);


app.get("/", (req, res) => {
  res.send("API is running ");
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});