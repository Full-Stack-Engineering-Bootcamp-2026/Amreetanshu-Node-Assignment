const http =require('http');
const express = require('express');
const parser = require('body-parser');


const app = express();

app.use(parser.urlencoded({extended:false}));
app.use('/hii',(req,res,next)=>{
    console.log('in the middleware');
        res.send( '<form action =/say-hii,method="post"><input type ="text" name="title"<button type = "submit">');
});

app.use('/say-high',(req,res,next)=>{
    console.log('in the next middleware');
        res.send( '<h1>hello fr</h1>');  

});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);