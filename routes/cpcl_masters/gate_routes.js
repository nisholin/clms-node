var dboperations = require('../../database/gate_table');
const express = require('express');
const router = express.Router();

//var config = require('./dbconfig');
//var sql = require('mssql');


//gate_Master
router.get('/gate',(req,res,next)=>{
	dboperations.getGateValues().then(result=>{
        var data = result[0];
        //console.table(data);
        res.render('menu_master/gate',{data});
    });
});

router.post('/gate/new',(req,res,next)=>{
	var data = req.body;
	 /* sql.connect(config,function(err){
		 var query = "INSERT INTO cpcl_gate_master set ?"
		  request.query(query,data,function(err,result){
			 if(err){
                    console.log("error while querying database -> "+err);
                    res.send(err);
                }
                else{
                    res.send(result);
                    sql.close();
                }
		  });
	 })
	res.send(data);	 */
});


module.exports = { 
	routes:router
}