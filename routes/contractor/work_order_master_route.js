const express = require('express');
const router = express.Router();
const { reset } = require('nodemon');
var db_operations = require('../../database/contractor/work_order_table');



router.get('/workordernew',(req,res,next)=>{
	db_operations.get_workOrder().then(result=>{
        var data = result[0];
        res.render('contractor_master/workordernew',{data});
    });
});

module.exports = { routes:router}