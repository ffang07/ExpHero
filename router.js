
const express=require('express');
let router=express.Router();
router.get('/',(req,res)=>{
    res.render('index',{})
})
.get('/add',(req,res)=>{
    res.render('add',{})
})
.get('/edit',(req,res)=>{
    res.render('edit',{})
})
.get('/info',(req,res)=>{
    res.render('view/info',{})
})
module.exports=router;