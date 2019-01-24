// express 

let express = require('express');

let app = express();

app.get('/user',(req,res)=>{
  res.json({name:'王闯__张曼'})
})

app.listen(3000);