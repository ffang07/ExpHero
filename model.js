const mysql = require('mysql');

let conn=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'520AbcAbc',
    database:'hero'
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
            if(err) return callback(err)
            callback(null,sqldata)
        })
    },
    deleteOneHeroData(id,callback){
        let sql='delete from heros where id=?;'
        conn.query(sql,[id],(err,result)=>{
            if (err) return callback(false);
            // console.log(result);
            callback(true);
        })
    }
}