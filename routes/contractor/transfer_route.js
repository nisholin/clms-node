const express = require('express');
const router = express.Router();
var dboperations = require('../../database/contractor/employee_master_table');


var config = require('../../database/dbconfig');
var sql = require('mssql');


//Add Employee 
router.post('/employee/transfer',(req,res,next)=>{
    var data = req.body;
   
    var CCODE = req.body.ccode;
    var ECODE = req.body.ecode;
	var ENAME = req.body.employee_name;
    var PRE_PO_NO = req.body.work_order_no;
    var CUR_PO_NO = req.body.transfer_to;

    var WO_CCODE     = req.body.transfer_ccode;
    var WO_CNAME     = req.body.transfer_cname;
    var WO_DATE      = req.body.work_order_todate;
    var WO_FROM_DTAE = req.body.old_wo_from;
    var WO_TO_DATE   = req.body.old_wo_to;
    
    console.log(data);

   async function getTransferValues(){
        try{
        let pool = await sql.connect(config);
        await pool.request().query(`insert into cpcl_transfer_detail ([DATE], CCODE, ENAME, ECODE, PRE_PO_NO, CUR_PO_NO, FROM_DATE, TO_DATE, STATUS, CREATED_BY, CREATED_ON) 
        values (GETDATE(),'${CCODE}','${ENAME}','${ECODE}','${PRE_PO_NO}','${CUR_PO_NO}',GETDATE(),'','2','1',GETDATE())`,function(err,result){
        if (err) throw err;
        console.log(result);
        });
        }

        catch(error){
        console.log(error);
        }
        try{
            let pool = await sql.connect(config);
            await pool.request().query(`update cpcl_employee_master set CCODE ='${WO_CCODE}',ENAME ='${WO_CNAME}',WO_FROM='${WO_FROM_DTAE}',WO_TO='GETDATA()', WORK_ORDER_No='${CUR_PO_NO}' WHERE ECODE ='${ECODE}'`,function(err,result){
                if (err) throw err;
                console.log(result);
                });
            }
    
            catch(error){
            console.log(error);
            }

    }
    getTransferValues();

    res.redirect("/employeetransfernew");
});


// transfer View
transfer = {};
router.get('/employeetransfernew',(req,res,next)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		dboperations.get_employee_transfer_master().then(result=>{
            transfer.user_Id = user_Id;
            transfer.user_name = user_name;
            var data = result[0]; 
            transfer.view = data;
            res.render('contractor_master/employeetransfernew',transfer);
    })
    } 
}); 
wodetails = {};
  router.get('/employee/employee_transfer',(req,res)=>{
    var user_Id = req.session.userId, user_name = req.session.user_name;
    //console.log(ecode);
    if(user_Id == null)
  {
      message = 'Wrong Credentials.';
      res.render('login.ejs',{message: message});
      return;
  }
  else{

    dboperations.get_work_order_no().then(result=>{
        wodetails.user_Id = user_Id;
        wodetails.user_name = user_name;
        var woDetailsCode = result[0]; 
        wodetails.woDetailsCode = woDetailsCode;
       // console.table(wodetails);
        res.render('contractor_master/employee_transfer',wodetails);
    })
  
  } 

})

router.post('/employee/workorder_details/onchange',(req,res)=>{
    var ecode = req.body.ecode;
    async function get_employee_code() {
        try{
            let pool = await sql.connect(config);
            let cont = await pool.request().query( `select CCODE,ECODE,ENAME,WORK_ORDER_No from cpcl_employee_master where ECODE = '${ecode}'`);
            return cont.recordsets;
        }
        catch(error) {
            console.log(error)
        }
    }
    get_employee_code().then(result=>{
        var EmpCodeDetails = result[0];
        res.send(EmpCodeDetails);
    })
})
router.post('/employee/check_workorder_details/onchange',(req,res)=>{
    var WONO = req.body.WONO;
    console.log(WONO);
    async function check_new_po_code_details() {
        try{
            let pool = await sql.connect(config);
            let cont = await pool.request().query(`select CCODE,CNAME,WORK_OR_DATE from cpcl_work_order_master where WORK_ORDER = '${WONO}'`);
           
            return cont.recordsets;

        }
        catch(error) {
            console.log(error)
        }
    }
    check_new_po_code_details().then(result=>{

        console.log(result);
        var checkWODetails = result[0];
        //console.log(checkWODetails);
        res.send(checkWODetails); 
    })
})

module.exports = { transfer:router }