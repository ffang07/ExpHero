
const express=require('express');
let router=express.Router();
let heroCtrl=require('./controller');
router.get('/',(req,res)=>{
    heroCtrl.showIndexPage(req,res);
})
.get('/add',(req,res)=>{
    heroCtrl.showAddPage(req,res);
})
.get('/edit',(req,res)=>{
    heroCtrl.showEditPage(req,res);
})
.get('/info',(req,res)=>{
    heroCtrl.showInfoPage(req,res);
})
module.exports=router;