var express= require("express");
var app= express();
// app.get('/',function(req,res){
//   res.send("helloworld");
// });
var routes=require('./routes/routes.js');
routes.use('/',require('./routes/openRoutes.js'));

app.use(routes);
// var con=require('./mysql/connection.js');
app.listen(9090,function(){
    // con.connect(function(){
    //   console.log("connected");
    // });
    console.log("conneted");
});
