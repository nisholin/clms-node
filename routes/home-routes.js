const express = require('express');
const router = express.Router();

var config = require('../database/dbconfig');

var sql = require('mssql');


const { indexView,
    iconsView,
    contractorNew,
   // employeenew,
    //workordernew,
    eicView,
    //Pass
    passReqOne,
    passReqTwo,
    passReqThree,
    printPass,
    //Attendance
    attendance,
    attendance_in_out,
    attendance_edit,
    //Pay Roll
    payGeneration,
    //Report
    contractorMaster,
    employeeMaster,
    inOut,
    worksOrder,
    eicReport
} = require('../controllers/homeController');

//const { engineer } = require('../routes/cpcl_masters/eng_routes');
//const { shift } = require('../routes/cpcl_masters/shift_routes');
//const { gate } = require('../routes/cpcl_masters/gate_routes');

//contractor
//const { getContactor_values } = require('../routes/contractor/contractor_routes');
const { work_order_master } = require('../routes/contractor/work_order_master_route');

const { getContactor_employee_values } = require('../routes/contractor/employee_master_route');






router.get('/dashboard', indexView);
router.get('/icons', iconsView);
//MENU MASTER
//router.get('/engineer', engineer);

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

//router.get('/shift', shift);
//router.get('/gate', gate);
//CONTRACTOR
//router.get('/contractornew', getContactor_values);
//router.get('/employeenew', getContactor_employee_values);
//router.get('/workordernew', work_order_master);
router.get('/eicmaster', eicView);
//PASS
router.get('/passrequestone', passReqOne);
router.get('/passrequesttwo', passReqTwo);
router.get('/passrequestthree', passReqThree);
router.get('/printpass', printPass);
//ATTENDANCE
router.get('/attendance', attendance);
router.get('/attendance_in_out', attendance_in_out);
router.get('/attendance_edit', attendance_edit);
//PAY ROLL
router.get('/payrollgeneration', payGeneration);
//REPORTS
router.get('/contractormaster', contractorMaster);
router.get('/employeemaster', employeeMaster);
router.get('/inout', inOut);
router.get('/workorder', worksOrder);
router.get('/eicreport', eicReport);

module.exports = { routes: router }
