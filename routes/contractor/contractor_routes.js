const { response } = require('express');
const express = require('express');
const router = express.Router();
var dboperations = require('../../database/contractor/cpcl_contractor_table');

var config = require('../../database/dbconfig');
var sql = require('mssql');



router.get('/contractornew',(req,res,next)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
	dboperations.contractor_data().then(result=>{
        var data = result[0];        
        //console.table(data);
        res.render('contractor_master/contractornew',{user_Id:user_Id,user_name:user_name,data})
    }) 
	}
	/* dboperations.contractor_data().then(result=>{
        var data = result[0];        
        //console.table(data);
        res.render('contractor_master/contractornew',{data})
    }) */
});

router.post('/contractor/new',(req,res,next)=>{
    //console.log('hi');
   var contractor_code=req.body.Contractor_Code;
   var contractor_name=req.body.Contractor_Name;
   var address=req.body.Address;
   var prefix_code=req.body.Prefix_Code;
   var proprietor=req.body.proprietor;
   var owner=req.body.owner;
   var md=req.body.md;
   var partner=req.body.partner;
   var contractor_mail=req.body.Contractor_Email;
   var ESI_Code_No=req.body.ESI_Code_No;
   var PF_Code_No=req.body.PF_Code_No;
   var Contractor_PAN_No=req.body.Contractor_PAN_No;
   var Contractor_LIN=req.body.Contractor_LIN;
   var Mobile_No=req.body.Mobile_No;
   var Name_of_person=req.body.Name_of_person;
   var compliance_Mail_id=req.body.compliance_Mail_id;
   var hr_department=req.body.hr_department;
   var status=0;
  
console.log(req.body);

   async function insertcontractor(){
    try{

        let pool=await sql.connect(config);
        await pool.request().query(`insert into cpcl_contractor_master (contractor_code ,contractor_name, address,prefix_code,proprietor,owner,
            md,partner,contractor_mail,ESI_Code_No,PF_Code_No,Contractor_PAN_No,Contractor_LIN,Mobile_No,Name_of_person,compliance_Mail_id,hr_department,status,created_by,created_on)
        values('${contractor_code}','${contractor_name}','${address}','${prefix_code}','${proprietor}','${owner}','${md}','${partner}','${contractor_mail}','${ESI_Code_No}','${PF_Code_No}',
        '${Contractor_PAN_No}','${Contractor_LIN}','${Mobile_No}','${Name_of_person}','${compliance_Mail_id}','${hr_department}','${status}','1','2021-01-30')`,(req,res)=>{

            console.log("successfully inserted");
        })
    }
catch(error)
{
    console.log(error);
}
   }
   insertcontractor();
   res.redirect("/contractornew");

});


module.exports = { 
	routes:router	
}