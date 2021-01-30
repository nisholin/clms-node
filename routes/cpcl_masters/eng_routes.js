var dboperations = require('../../database/engineer_table');
const express = require('express');
const router = express.Router();

 // MENU MASTER
/* const engineer = (req, res, next) => {
    dboperations.getEngvalues().then(result =>{                
        var data = result[0];
    res.render('menu_master/engineer',{data});
})
}; */
 

router.get('/engineer',(req, res)=>{
    dboperations.getEngvalues().then(result =>{                
        var data = result[0];
    res.render('menu_master/engineer',{data});
})
	//res.render('menu_master/engineer');
});

/* router.post('/engineer/update', function (req, res, next) {
    const id = req.body;
    //console.log(id);
    async function getGateValue() {
        try {
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from cpcl_engineer_master where id = '1'");
            //console.log(products); 
                var view = products[0];
            res.render('menu_master/engineer',{view});
        }
        catch (error) {
            console.log(error);
        }
    }
    var data = getGateValue();
    res.send(data);
}); */


module.exports = {
    engineer:router    
}