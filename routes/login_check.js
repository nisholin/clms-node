var config = require('../database/dbconfig');
var sql = require ('mssql');

exports.login = function(req, res){
    var message ='Login check';
    var sess = req.session;

    if(req.method == "POST"){
        var post = req.body;
        var name = post.email;
        var pass = post.pass;

        //GET API
            async function getGateValues(){
            try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("SELECT [user_id],[user_name]  FROM [CLMS_V].[dbo].[user_master] where user_name='"+name+"' and password='"+pass+"'");
            return products.recordsets;

            }
            catch(error){
            console.log(error);
            }
            }
    
        getGateValues().then(result=>{           

            console.log();

            
            if(result[0].length)
            {
            req.session.userId = result[0].user_id;
            req.session.user = result[0].user_name;
            res.redirect('/home');
            }
            else
            {
                message = 'Wrong Credentials.';
                res.redirect('/login',{message: message});
             } 

        });
          
        
    }
}


