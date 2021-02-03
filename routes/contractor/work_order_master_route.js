const { request } = require('express');
const express = require('express');
const router = express.Router();
const { reset } = require('nodemon');
var db_operations = require('../../database/contractor/work_order_table');

var sql = require("mssql");
var config = require('../../database/dbconfig');




router.get('/workordernew',(req,res,next)=>{
	/* var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		dboperations.get_workOrder().then(result=>{
        var data = result[0]; 
        res.render('contractor_master/workordernew',{data})
    })
    } */
    db_operations.get_workOrder().then(result=>{
        var data = result[0]; 
        res.render('contractor_master/workordernew',{data})
    })
});
router.get('/workordernew/add', function (req, res) {
    db_operations.get_contractor_code().then(result=>{

        var name = "please select ccode";
        var code = result[0];
        //console.table(code);
        res.render('contractor_master/workorderedit',{code});
    });
});
router.post('/workordernew/add/getcontractorname', function (req, res) {
    var contractor_code = req.body.contractor_code;
    //console.log(contractor_code);
    async function get_employee_name(){
        try{
                let pool = await sql.connect(config);
                let product = await pool.request().query(`
                select contractor_name from cpcl_contractor_master where  contractor_code = '${contractor_code}'`
                );
                return product.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    get_employee_name().then(result=>{
        var name = result[0];
        console.log(name);
        res.render('contractor_master/workorderedit',{name});
    }); 
});

router.post('/workordernew/add',(req,res,next)=>{
    var data = req.body;
    //var ismw_rcno = req.body.ismw_rcno;
    console.log(data);
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
    var clra_rcno = req.body.clra_rcno;
    var clra_rc_str = req.body.clra_rc_str;
    var clra_lic_no = req.body.clra_lic_no;
    var clra_period_from = req.body.clra_period_from;
    var clra_period_to = req.body.clra_period_to;
    var clra_workmen = req.body.clra_workmen;
    var clra_total_workmen = req.body.clra_total_workmen;
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
    //getWorkOrderValues();
    res.redirect("/workordernew")
	 
});

module.exports = { routes:router}