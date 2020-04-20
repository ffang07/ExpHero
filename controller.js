let heroModel=require('./model');
const moment=require('moment');
let formidable = require('formidable');
// let multiparty = require('multiparty');  //报错

module.exports={
    showIndexPage(req,res){
        heroModel.getAllHeroData((err,sqldata)=>{
            if(err) return res.json({
                code: 201,
                msg: '没有数据'
            })
            // res.render('index',{data: sqldata})    //后端ejs挖坑渲染
            res.render('template/index',{data: sqldata})   //ejs没挖坑,不渲染! 可传空对象{}
                                        //前端发ajax请求数据用template渲染
        })
        
    },
    showAddPage(req,res){
        res.render('add',{});   //空对象,不需要渲染
    },
    showEditPage(req,res){
        let {id} = req.query;
        if (!id) return res.json({code:202,msg:'没有id'})
        heroModel.getOneHeroData(id,(err,sqldata)=>{
            if ( err || sqldata.length==0 )  return res.json({code:201,msg:'没有数据'})
            // res.render('edit',{data:sqldata});    //后端ejs渲染
            res.render('template/edit',{data: sqldata})    //ejs传空对象{},不渲染! 不挖坑也可
                                //前端发ajax请求数据,直接给元素赋值 $('input.键类名').val(值)
        })
    },
    showInfoPage(req,res){
        let {id} = req.query;  //express内置了req.query获取get请求的参值obj
        if (!id) return res.json({code:202,msg:'没有id'});
        heroModel.getOneHeroData(id,(err,sqldata)=>{
            // console.log('打印2:',id,err,sqldata,sqldata.length);
            if ( err || sqldata.length==0 )  return res.json({code:201,msg:'没有数据'})
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
    getOneHeroInfo(req,res){
        let {id} = req.query;  //express内置了req.query获取get请求的参值obj
        if (!id) return res.json({code:202,msg:'没有id'});
        heroModel.getOneHeroData(id,(err,sqldata)=>{
            // console.log('打印3:',id,err,sqldata,sqldata.length);
            if ( err || sqldata.length==0 )  return res.json({code:201,msg:'没有数据'})
            res.json({code:200,msg:'获取成功',data:sqldata})
        })
    },
    deleteOneHeroInfo(req,res){
        let {id} = req.query; 
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
    },
    updateHeroInfo(req,res){
        let hero = req.body;
        hero.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        heroModel.updateHeroData(hero,result=>{
            if(!result) return res.json({code:201,msg:'更新失败'})
            res.json({code:200,msg:'更新成功'})
        })
    },
    uploadHeroInfo(req,res){
        const form = formidable({ multiples: true ,uploadDir:'./upload',keepExtensions:true});
        form.parse(req, (err, fields, files) => {
            console.log('formidable解析2进制:',err,'非文件数据:',fields,'文件数据:',files);
          if (err) {
            next(err);
            res.json({code:201,msg:'上传失败'});
            return;
          }
        //   console.log(req.body);   //req.body为空{} 
          let id= fields.id2;
          let uplpath=files.photo0.path;   //多个图,只取第一个!
          console.log('打印',id,uplpath);
          heroModel.uploadHeroData(uplpath,id,(result)=>{
            if(!result) return res.json({code:202,msg:'上传成功,存库失败'})
            res.json({code:200,msg:'上传存库成功',data:{ fields, files }});
          })
        });

    }
}