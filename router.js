
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
    // console.log(req.query);   //express内置了req.query获取get请求的参值obj
    heroCtrl.showInfoPage(req,res);
})
.get('/getAllHeroInfo',(req,res)=>{
    // 前端Ajax请求数据用template渲染
    heroCtrl.getAllHeroInfo(req,res);
})
.get('/getOneHeroInfo',(req,res)=>{
    heroCtrl.getOneHeroInfo(req,res);
})
.get('/deleteOneHero',(req,res)=>{
    heroCtrl.deleteOneHeroInfo(req,res);
})
.post('/addOneHero',(req,res)=>{
    heroCtrl.addOneHeroInfo(req,res);
})
.post('/updateHeroInfo',(req,res)=>{
    heroCtrl.updateHeroInfo(req,res);
})
module.exports=router;