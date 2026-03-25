const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Add Book</h2>
        <form action="/add" method="POST">
          <label>Book Title:</label>
          <input type="text" name="title" />
          <br><br>
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

router.post('/product',(req,res,next)=>{

    console.log(req.body);
    res.redirect('/');
       
    
});

module.exports =router;