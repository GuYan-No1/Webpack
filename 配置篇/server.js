// express 

let express = require('express');
let app = express();
let webpack = require('webpack');
//需要中间件
let middleware = require('webpack-dev-middleware');
let config= require('./webpack.config.js');
let compiler = webpack(config);
app.use(middleware(compiler));
app.get('/user',(req,res)=>{
  res.json({name:'王闯__张曼'})
})

app.listen(3000);