const express = require('express');
const router = express.Router();
var dboperations = require('../../database/contractor/cpcl_contractor_mail');

var config = require('../../database/dbconfig');
var sql = require('mssql');


//Contractor Mail Master  View
router.get('/contractor_Mail',(req,res,next)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
	dboperations.contractor_mail_data().then(result=>{
        var data = result[0];
        res.render('contractor_master/contractormail',{user_Id:user_Id,user_name:user_name,data})
    }) 
	}
});


//Contractor Mail Master edit

router.get('/mail_edit_page/:contractor_mail_table_id',(req,res)=>{
    const cmailid = req.params.contractor_mail_table_id;

    //console.log(cmailid);
    async function contractormailupdate(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from contractor_email where id = ${cmailid}`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }   
    var user_Id = req.session.userId, user_name = req.session.user_name;
    contractormailupdate().then(result=>{
        var con_edit_data = result[0];
        res.render('contractor_master/contractor_mail_edit',{user_Id:user_Id,user_name:user_name,con_edit_data:con_edit_data});
    })  
});



//Contractor update process
router.post('/contractor_Mail/update',(req, res) => {
    var data = req.body;

    async function contractormailupdate(){
        try{
            let pool = await sql.connect(config);            

            await pool.request().query(`UPDATE contractor_email  SET  primary_mail='${req.body.primary_mail}', 
            secondary_mail_one='${req.body.secondary_mail_one}',secondary_mail_two='${req.body.secondary_mail_two}', 
            secondary_mail_three='${req.body.secondary_mail_three}',secondary_mail_four='${req.body.secondary_mail_four}',
             secondary_mail_five='${req.body.secondary_mail_five}', secondary_mail_six='${req.body.secondary_mail_six}'
            WHERE id='${req.body.id}'`);
        }
        catch(error){
            console.log(error);
        }
        console.log("Contractor Updated Successfully");
    } 

    contractormailupdate();

     res.redirect('/contractor_Mail'); 
});

module.exports = { 
	contractorMail : router	
}