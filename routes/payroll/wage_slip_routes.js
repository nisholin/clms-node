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



module.exports = {
    wageslip : router
}