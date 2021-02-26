const express = require('express');
const router = express.Router();
var dboperations = require('../../database/contractor/cpcl_contractor_table');

var config = require('../../database/dbconfig');
var sql = require('mssql');


//Contractor View
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
});

//Contractor Insert
router.post('/contractor/new',(req,res,next)=>{

   var contractor_code      =   req.body.Contractor_Code;
   var prefix_code          =   req.body.Prefix_Code;
   //var contractor_code = prefix_code +- contractor_no;
   //console.log(contractor_code);
   var contractor_name      =   req.body.Contractor_Name;
   var address              =   req.body.Address;
   var proprietor           =   req.body.proprietor;
   var owner                =   req.body.owner;
   var md                   =   req.body.md;
   var partner              =   req.body.partner;
   var contractor_mail      =   req.body.Contractor_Email;
   var ESI_Code_No          =   req.body.ESI_Code_No;
   var PF_Code_No           =   req.body.PF_Code_No;
   var Contractor_PAN_No    =   req.body.Contractor_PAN_No;
   var Contractor_LIN       =   req.body.Contractor_LIN;
   var Mobile_No            =   req.body.Mobile_No;
   var Name_of_person       =   req.body.Name_of_person;
   var compliance_Mail_id   =   req.body.compliance_Mail_id;
   var hr_department        =   req.body.hr_department;
   var status               =   req.body.status;
   var username             =   req.body.username;
   var password             =   req.body.Password;
  
//console.log(req.body);

   async function insertcontractor(){
    try{

        let pool=await sql.connect(config);
        await pool.request().query(`insert into cpcl_contractor_master (contractor_code ,contractor_name, address,prefix_code,proprietor,owner,
            md,partner,contractor_mail,ESI_Code_No,PF_Code_No,Contractor_PAN_No,Contractor_LIN,Mobile_No,Name_of_person,compliance_Mail_id,hr_department,status,user_name,password)
        values('${contractor_code}','${contractor_name}','${address}','${prefix_code}','${proprietor}','${owner}','${md}','${partner}','${contractor_mail}','${ESI_Code_No}','${PF_Code_No}',
        '${Contractor_PAN_No}','${Contractor_LIN}','${Mobile_No}','${Name_of_person}','${compliance_Mail_id}','${hr_department}','${status}','${username}','${password}')`,(req,res)=>{

        //console.log("successfully inserted");
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

//Contractor edit
router.get('contractor_edit/:contractorid',(req,res)=>{
    const cid = res.params.contractorid;
    async function contractorupdate(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from cpcl_contractor_master where id = ${cid}`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }   
    var user_Id = req.session.userId, user_name = req.session.user_name;
    contractorupdate().then(result=>{
        var con_edit_data = result[0];
        res.render('contractor_master/contractoredit',{user_Id:user_Id,user_name:user_name,con_edit_data:con_edit_data});
    })
});


router.get('/contractor_edit/:contractorid',(req, res) => {

    const cid = req.params.contractorid;

    async function contractorupdate(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from cpcl_contractor_master where id = ${cid}`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }    

    var user_Id = req.session.userId, user_name = req.session.user_name;

    contractorupdate().then(result=>{
        var con_edit_data = result[0];
        res.render('contractor_master/contractoredit',{user_Id:user_Id,user_name:user_name,con_edit_data:con_edit_data});
    })

});



//Contractor update process
router.post('/contractornew/update',(req, res) => {
    var data = req.body;
    //console.table(data);
    var hr_department = req.body.hr_department;
    var id = req.body.status;
    //console.log(hr_department);
    //console.log(id);
    async function contractornewupdate(){
        try{
            let pool = await sql.connect(config);
            await pool.request().query(`update cpcl_contractor_master SET contractor_code='${req.body.Contractor_Code}',
            contractor_name='${req.body.Contractor_Name}',address='${req.body.Address}',prefix_code='${req.body.Prefix_Code}',
            proprietor='${req.body.proprietor}',owner='${req.body.owner}',md='${req.body.md}',partner='${req.body.partner}',
            contractor_mail='${req.body.Contractor_Email}',ESI_Code_No='${req.body.ESI_Code_No}',PF_Code_No='${req.body.PF_Code_No}',
            Contractor_PAN_No='${req.body.Contractor_PAN_No}',Contractor_LIN='${req.body.Contractor_LIN}',Mobile_No='${req.body.Mobile_No}',
            status='${req.body.status}',Name_of_person='${req.body.Name_of_person}',
			compliance_Mail_id='${req.body.compliance_Mail_id}',
            hr_department='${req.body.hr_department}'   where id='${req.body.id}'`);
        }
        catch(error){
            console.log(error);
        }
        //console.log("Contractor Updated Successfully");
    } 

    contractornewupdate();

     res.redirect('/contractornew'); 
});





module.exports = { 
	contractor:router	
}