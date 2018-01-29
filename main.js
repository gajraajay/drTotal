var express= require("express");
var app= express();
// app.get('/',function(req,res){
//   res.send("helloworld");
// });
var routes=require('./routes/routes.js');
var userModle=require('./models/users.js');
var user=new userModle("a","b","v","v","as");
var user1=new userModle("a","c","v","v","asad");
routes.use('/',require('./routes/openRoutes.js'));

// var user=new userModel('ajay','gajra','a@i.com','1234567890','password');

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
    console.log(user.getName());
    console.log(user1.getName());
    console.log("conneted"+abc.name());
});
