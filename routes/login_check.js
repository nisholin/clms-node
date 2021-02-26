
exports.login_check=(req,res)=>{

    var sess = req.session;
    if(req.method == "POST"){
        var post = req.body;
        var name = post.Username;
        var pass = post.Password;


        console.log(name+pass);

        if(name=='admin' && pass== 'admin@123')
        {
            req.session.userId = 'admin';
            req.session.user_name = 'admin@123';
            req.session.cont_code = 'CON-001';
            console.log(req.session.userId+req.session.user_name)
            res.redirect('/home');        
        }
        else
        {
            message = 'Wrong Credentials.';
           res.render('login',{message: message});
        }
    }
    
}

exports.main_page = function(req,res){
    var user_Id = req.session.userId;
    var user_name = req.session.user_name;
    var con_code = req.session.cont_code;
    if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login',{message: message});
		return;
    }
    else{

        res.render('home',{user_Id:user_Id,user_name:user_name,con_code: con_code});
    }

}