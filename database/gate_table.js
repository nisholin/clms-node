var config = require('./dbconfig');

var sql = require('mssql');


async function getGateValues(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT [id],[name],[status]  FROM [CLMS_V].[dbo].[cpcl_gate_master]");
        return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//let data = {name: req.body.name, status: req.body.status};
/* let sql = "update cpcl_gate_master SET name='"+req.body.name+"', status='"+req.body.status+"' where id ="+Id; */

module.exports = {    getGateValues     }