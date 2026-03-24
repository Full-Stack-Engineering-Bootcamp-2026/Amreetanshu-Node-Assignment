const http =require('http');
const express = require('express');
const parser = require('body-parser');


const app =express();

app.use('/about',(req,res,next)=>{

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>About</title>
    </head>
    <body>
        <h1>About Page</h1>
        <p>This is a simple About page.</p>
    </body>
    </html>
  `);

})

app.use('/contact',(req,res,next)=>{

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Contact</title>
    </head>
    <body>
        <h1>contact Page</h1>
        <p>This is a simple contact page.</p>
    </body>
    </html>
  `);

})

app.use('/skills',(req,res,next)=>{

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>About</title>
    </head>
    <body>
        <h1>skill Page</h1>
        <ul>
        <li>cpp</li>
        <li>java</li>
        <li>javascript</li>
        </ul>

    </body>
    </html>
  `);

})

app.use('/', (req,res,next)=>{

    res.send( '<h1> Hii Welcome</h1>')

});


app.listen(3000);