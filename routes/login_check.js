
exports.login_check=(req,res)=>{

    var sess = req.session;
    if(req.method == "POST"){
        var post = req.body;
        var name = post.Username;
        var pass = post.Password;


        console.log(name+pass);

        if(name=='admin' && pass==123)
        {
            req.session.userId = 'admin';
            req.session.user_name = 123;
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

exports.main_page = function(req,res,next){
    var user_Id = req.session.userId;
    var user_name = req.session.user_name;
    if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login',{message: message});
		return;
    }
    else{

        res.render('home',{user_Id:user_Id,user_name:user_name});
    }

}