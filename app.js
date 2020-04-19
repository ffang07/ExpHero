
const express=require('express');
let router = require('./router');

const app=express();
app.set('view engine','ejs');  //此set自动require了ejs!   默认的视图引擎是jade
app.use('/node_modules',express.static('node_modules'));
app.listen(3000,()=>{
    console.log('server is running at http:127.0.0.1:3000');
})
app.use(router);