
const express=require('express');
let heroCtrl=require('./controller');
// let heroModel=require('./model');

let router=express.Router();
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
.get('/getAllHeroInfo',(req,res)=>{
    // 前端Ajax请求数据用template渲染
    heroCtrl.getAllHeroInfo(req,res);
})
module.exports=router;