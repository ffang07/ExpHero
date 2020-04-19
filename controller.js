let heroModel=require('./model');
const moment=require('moment');

module.exports={
    showIndexPage(req,res){
        heroModel.getAllHeroData((err,sqldata)=>{
            if(err) return res.json({
                code: 201,
                msg: '没有数据'
            })
            // console.log(sqldata);     // 数组[ 每行RowDataPacket{字段:值, ...} , ..很多行.. ]
            // res.render('index',{data: sqldata})    //后端ejs渲染
            res.render('template/index',{data: sqldata})   //前端template渲染
        })
        
    },
    showAddPage(req,res){
        res.render('add',{});
    },
    showEditPage(req,res){
        res.render('edit',{});
    },
    showInfoPage(req,res){
        let {id} = req.query;  //express内置了req.query获取get请求的参值obj
        console.log(id);
        heroModel.getOneHeroData(id,(err,sqldata)=>{
            if (err) return res.json({code:201,msg:'没有数据'})
            console.log(sqldata);  // 数组[ 只有一行RowDataPacket{字段:值, ...} ]
            res.render('info',{data:sqldata});
        })
        
    },
    getAllHeroInfo(req,res){
        // 前端Ajax请求数据用template渲染
        heroModel.getAllHeroData((err,sqldata)=>{
            if(err) return res.json({
                code: 201,
                msg: '没有数据'
            })
            res.json({
                code: 200,
                msg: '获取成功',
                data: sqldata
            })
        })
    },
    deleteOneHeroInfo(req,res){
        let {id} = req.query; 
        console.log(id);
        heroModel.deleteOneHeroData(id,(result)=>{
            if(!result) return res.json({code:201,msg:'删除失败'})
            res.json({code:200,msg:'删除成功'})
        })
    },
    addOneHeroInfo(req,res){
        let hero = req.body;
        hero.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        heroModel.addOneHeroData(hero,result=>{
            if(!result) return res.json({code:201,msg:'添加失败'})
            res.json({code:200,msg:'添加成功'})
        })
    }
}