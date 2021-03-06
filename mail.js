

var pool = sql.connect(config, function (err) {
    if (err) throw err;
      console.log("Connected!");

    //console.log(csvData);
     for(i=0;i<csvData.length;i++){
      for(j=0;j<csvData.length;j++){

            var shift_name             = csvData[i][0];
            var from_time             = csvData[i][1];
            var to_time      = csvData[i][2];
            var status = csvData[i][3];
      }


      


      var sql = `INSERT INTO [cpcl_shift_master]
      ([shift_name]       ,[from_time]      ,[to_time]      ,[status]      ,[created_by]
      ,[created_on]) VALUES ( '${shift_name}', '${from_time}', '${to_time}','${status}',1,  GETDATE())`;     
     
          pool.query(sql, function (err, result) {
        if (err) throw err;

      });   
      }        
  });