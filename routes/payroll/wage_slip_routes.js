const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');




router.get('/wage_slip',(req,res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
  res.render('pay_roll/wage_slip',{user_Id:user_Id,user_name:user_name})
  }
    /* res.render('pay_roll/wage_slip') */
});



/*router.post('wageslip/wageslip',(req,res,next)=>{
    var Contractor = req.body.Contractor;
    var employee = req.body.employee;
    var month = req.body.month;
    async function getwageslipvalues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_engineer_master (Contractor,employee,month) values ('"+Contractor+"','"+employee+"','"+month+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
  getwageslipvalues();
	res.redirect("pay_roll/wage_slip");
	 
});
*/


module.exports = {
    wageslip : router
}