var mysql = require('mysql');

  var con= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"mydb"
  });
  con.connect(function(){
    console.log("connected");
  });
module.exports=con;
