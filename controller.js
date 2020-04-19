let heroModel=require('./model');

module.exports={
    showIndexPage(req,res){
        heroModel.getAllHeroData((err,sqldata)=>{
            if(err) return res.json({
                code: 201,
                msg: '没有数据'
            })
            console.log(sqldata);     // 数组[ 每行RowDataPacket{字段:值, ...} , ..很多行.. ]
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
        res.render('info',{});
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
    }
}