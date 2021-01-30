const { request } = require('express');
const express = require('express');
const router = express.Router();
const { reset } = require('nodemon');
var db_operations = require('../../database/contractor/work_order_table');

var config = require('../../database/dbconfig');
var sql = require('mssql');



router.get('/workordernew',(req,res,next)=>{
	db_operations.get_workOrder().then(result=>{
        var data = result[0];
        res.render('contractor_master/workordernew',{data});
    });
});

router.post('/workordernew/add',(req,res,next)=>{
    var data = req.body;
    //console.table(data);
    var CCODE               = req.body.Contractor_Code;
    var VENDOR_NO           = req.body.Vendor_No;
    var WORK_ORDER          = req.body.Work_order_no;
    var WORK_OR_DATE        = req.body.Work_order_date;
    var CVALUE              = req.body.Contractor_Value;
    var DURATION            = req.body.Duration_Date;
    var CDURATION           = req.body.Contract_Duration;
    var EIC_PRNO            = req.body.EIC_PRNO;
    var EIC                 = req.body.Engineer_In_Charge;
    var JOB_DESC            = req.body.Job_Desc;
    var DEPARTMENT          = req.body.Department;
    var EMPLOYEE_COUNT      = req.body.Employee_count;
    var CLRA                = req.body.CLRA;
    var ISMW                = req.body.ISMW;
    var WORKMEN_TOT       = req.body.Total_Workmen; 
    //console.log(WORKMEN_TOT);
    async function getWorkOrderValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query(`insert into cpcl_work_order_master 
             (CCODE,VENDOR_NO,WORK_ORDER,WORK_OR_DATE,CVALUE,DURATION,CDURATION,EIC_PRNO,EIC,JOB_DESC,DEPARTMENT,EMPLOYEE_COUNT,
            CLRA,ISMW,WORKMEN_TOT)
             values('${CCODE}','${VENDOR_NO}','${WORK_ORDER}','${WORK_OR_DATE}','${CVALUE}','${DURATION}','${CDURATION}',
             '${EIC_PRNO}','${EIC}','${JOB_DESC}',
             '${DEPARTMENT}','${EMPLOYEE_COUNT}','${CLRA}','${ISMW}','${WORKMEN_TOT}')`,(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getWorkOrderValues();
    res.redirect("/workordernew")
	 
});

module.exports = { routes:router}