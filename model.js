const mysql = require('mysql');

let conn=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'520AbcAbc',
    database:'hero',
    dateStrings: true
});
conn.connect();
module.exports={
    getAllHeroData(callback) {
        //使用SQL语句查询所有的英雄数据 
        let sql = 'select * from heros;'

        conn.query(sql,(err,sqldata)=>{
            if(err) return callback(err)
            callback(null,sqldata)   // 数组[ 每行RowDataPacket{字段:值, ...} , ..很多行.. ]
        })
    },
    getOneHeroData(id,callback) {
        let sql = 'select * from heros where id=?;'
        conn.query(sql,[id],(err,sqldata)=>{
            // console.log('打印1:',id,err,sqldata); //sqldata 数组[ 只有一行RowDataPacket{字段:值, ...} ]
            if(err) return callback(err);
            callback(null,sqldata);
        })
    },
    deleteOneHeroData(id,callback){
        let sql='delete from heros where id=?;'
        conn.query(sql,[id],(err,result)=>{
            if (err) return callback(false);
            // console.log(result);
            callback(true);
        })
    },
    // 添加英雄数据
    addOneHeroData(hero,callback) {
        let sql = 'insert into heros set ?'
        conn.query(sql,[hero],(err,result)=>{
            console.log(err,result);
            if(err) return callback(false);
            callback(true);
        })
    },
    updateHeroData(hero,callback){
        let {id} = hero;
        delete hero.id;
        let sql='update heros set ? where id=?'
        conn.query(sql,[hero,id],(err,result)=>{
            // console.log('打印4:',hero,id,err,result);
            if(err) return callback(false);
            callback(true);
        })
    },
    uploadHeroData(upl,id,callback){
        let sql='update heros set photo=? where id=?;'
        conn.query(sql,[upl,id],(err,result)=>{
            if (err) return callback(false);
            callback(true);
        })
    }
}