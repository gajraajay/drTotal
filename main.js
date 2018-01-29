var express= require("express");
var app= express();
// app.get('/',function(req,res){
//   res.send("helloworld");
// });
var routes=require('./routes/routes.js');
routes.use('/',require('./routes/openRoutes.js'));

function myFunction(a,b,c){
    this.a=a;
    this.b=b;
    this.c=c;
}
myFunction.prototype.name=function(){
        return "test"+this.a+this.b+this.c;
}
app.use(routes);
// var con=require('./mysql/connection.js');
app.listen(9090,function(){
    // con.connect(function(){
    //   console.log("connected");
    // });
    var abc= new myFunction("aa","bb","cc");

    console.log("conneted"+abc.name());
});
