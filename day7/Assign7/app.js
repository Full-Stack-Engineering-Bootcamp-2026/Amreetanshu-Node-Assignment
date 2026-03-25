const path = require('path')
const express = require('express');
const routes =express.Router();

routes.get('/', (req,res,next)=>{
    res.send(`<h1>Hii from Home</h1>`);
});
routes.get('/users',(req,res,next)=>{
    res.send(`<h1>These are the users</h1>`)
});
routes.get('/products',(req,res,next)=>{
    res.send(`<h1>Productss.</h1>`)
});

routes.get('/form',(req,res,next)=>{

    res.sendFile(path.join(__dirname,'views','product.html'));

})


module.exports = routes;

