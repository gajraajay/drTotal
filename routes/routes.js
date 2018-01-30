// var middleware=function(req,res,next){
//     console.log("callback");
//     next();
// }

var express= require("express");
var app= express();
// app.use(middleware);
module.exports= app.get('/',function(req,res,next){
  console.log("call");
  next();
},function(req,res){
      res.send("hi");
  });
