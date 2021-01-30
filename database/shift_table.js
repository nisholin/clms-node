var config = require('./dbconfig');

var sql = require('mssql');

async function get_shift_values(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from cpcl_shift_master");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function get_shift_values(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from cpcl_shift_master");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//let data = {name: req.body.name, from_time: req.body.from_time, to_time: req.body.to_time, status: req.body.status};

/* let sql = "update cpcl_shift_master SET name='"+req.body.name+"',  from_time='"+req.body.from_time+"',  to_time='"+req.body.to_time+"', status='"+req.body.status+"' where id ="+userId; */

/* 
INSERT into cpcl_shift_master(name, from_time, to_time, status)Values(?,?,?,?)[name, from_time, to_time, status]; */

module.exports={    get_shift_values  }