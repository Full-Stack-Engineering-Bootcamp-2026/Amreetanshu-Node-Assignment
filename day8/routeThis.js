const express= require('express');
const routes =express.Router();

routes.get('/about',(req,res,next)=>{
    console.log("in the get request");
    res.send(`<h1>This is the Get req</h1>`);
})

routes.post('/post',(req,res,next)=>{
    console.log("in the post req");
    console.log(req.body);
})
    
    


module.exports=routes;