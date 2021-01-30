var dboperations = require('../../database/gate_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


//gate_Master
router.get('/gate',(req,res,next)=>{
	dboperations.getGateValues().then(result=>{
        var data = result[0];
        //console.table(data);
        res.render('menu_master/gate',{data});
    });
});

router.post('/gate/new',(req,res,next)=>{
    var name = req.body.name;
    var status = req.body.status;
    console.log(name);
    async function getGateValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_gate_master values ('"+name+"','"+status+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getGateValues();
	 
});


module.exports = { 
	routes:router
}