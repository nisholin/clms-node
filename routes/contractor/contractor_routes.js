const express = require('express');
const router = express.Router();
var dboperations = require('../../database/contractor/cpcl_contractor_table');


router.get('/contractornew',(req,res,next)=>{
	dboperations.contractor_data().then(result=>{
        var data = result[0];        
        //console.table(data);
        res.render('contractor_master/contractornew',{data})
    })
});




module.exports = { 
	routes:router	
}