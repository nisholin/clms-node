const express = require('express');

const { indexView,
    iconsView,
    contractorNew,
    employeenew,
    workordernew,
    engineer,
    shift,
    gate,
    eicView,
    //Pass
    passReqOne,
    passReqTwo,
    passReqThree,
    printPass,
    //Attendance
    attendance,
    //Pay Roll
    payGeneration,
    //Report
    contractorMaster,
    employeeMaster,
    inOut,
    worksOrder,
    eicReport
} = require('../controllers/homeController');

const router = express.Router();

router.get('/dashboard', indexView);
router.get('/icons', iconsView);
//MENU MASTER
router.get('/engineer', engineer);
router.get('/shift', shift);
router.get('/gate', gate);
//CONTRACTOR
router.get('/contractornew', contractorNew);
router.get('/employeenew', employeenew);
router.get('/workordernew', workordernew);
router.get('/eicmaster',eicView);
//PASS
router.get('/passrequestone', passReqOne);
router.get('/passrequesttwo', passReqTwo);
router.get('/passrequestthree', passReqThree);
router.get('/printpass', printPass);
//ATTENDANCE
router.get('/attendance', attendance);
//PAY ROLL
router.get('/payrollgeneration', payGeneration);
//REPORTS
router.get('/contractormaster', contractorMaster);
router.get('/employeemaster', employeeMaster);
router.get('/inout', inOut);
router.get('/workorder', worksOrder);
router.get('/eicreport', eicReport);

module.exports = {
    routes: router
}
