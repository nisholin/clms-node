 var config = require('../dbconfig');

var sql = require ('mssql');

async function get_workOrder(){
    try{
            let pool = await sql.connect(config);
            let product = await pool.request().query("SELECT [id],[CCODE],[CNAME],[VENDOR_NO],[WORK_ORDER],[WORK_OR_DATE],[CVALUE],[DURATION],[CDURATION],[EIC_PRNO],[EIC],[JOB_DESC],[DEPARTMENT],[EMPLOYEE_COUNT],[CLRA],[ISMW],[WORKMEN_TOT],[EXCESS_CLRA_COUNT],[EXCESS_CLRA_CONT_COUNT],[STATUS],[CREATED_BY],[CREATED_ON],[MODIFIED_BY],[MODIFIED_ON] FROM [CLMS_V].[dbo].[cpcl_work_order_master]");
            return product.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
/*let data = {Contractor_Code: req.body.Contractor_Code,Vendor_No: req.body.Vendor_No,Contractor_Name: req.body.Contractor_Name,Work_order_no: req.body.Work_order_no,Work_order_date: req.body.Work_order_date,Contractor_Value: req.body.Contractor_Value,Duration_Date: req.body.Duration_Date,Contract_Duration: req.body.Contract_Duration,EIC_PRNO: req.body.EIC_PRNO,Engineer_In_Charge: req.body.Engineer_In_Charge,Job_Desc: req.body.Job_Desc,Department: req.body.Department,Employee_count: req.body.Employee_count,CLRA: req.body.CLRA,ISMW: req.body.ISMW,Total_Workmen: req.body.Total_Workmen

let sql = "update cpcl_work_order_master SET Contractor_Code='"+req.body.Contractor_Code+"',  Vendor_No='"+req.body.Vendor_No+"',Contractor_Name='"+req.body.Contractor_Name+"',Work_order_no='"+req.body.Work_order_no+"',Work_order_date='"+req.body.Work_order_date+"',Contractor_Value='"+req.body.Contractor_Value+"',Duration_Date='"+req.body.Duration_Date+"',Contract_Duration='"+req.body.Contract_Duration+"',EIC_PRNO='"+req.body.EIC_PRNO+"',Engineer_In_Charge='"+req.body.Engineer_In_Charge+"',Job_Desc='"+req.body.Job_Desc+"',Department='"+req.body.Department+"',Employee_count='"+req.body.Employee_count+"',CLRA='"+req.body.CLRA+"',ISMW='"+req.body.ISMW+"',Total_Workmen='"+req.body.Total_Workmen+"' where id ="+Id;*/


/* 
INSERT into cpcl_work_order_master(Contractor_Code, Vendor_No, Contractor_Name, Work_order_no, Work_order_date, Contractor_Value, Duration_Date, Contract_Duration, EIC_PRNO, Engineer_In_Charge, Job_Desc, Department, Employee_count, CLRA, ISMW, Total_Workmen)Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)[Contractor_Code, Vendor_No, Contractor_Name, Work_order_no, Work_order_date, Contractor_Value, Duration_Date, Contract_Duration, EIC_PRNO, Engineer_In_Charge, Job_Desc, Department, Employee_count, CLRA, ISMW, Total_Workmen]; */


module.exports ={ get_workOrder }