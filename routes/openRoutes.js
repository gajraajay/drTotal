var express= require("express");
var app= express();

app.get("/",function(req,res){
    res.send("this is fun");
});
module.exports=app;
