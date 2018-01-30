var express= require("express");
var bodyParser = require('body-parser');
var md5 = require('md5');
var app= express();
var constants=require('./../utils/constants.js');
app.use(bodyParser.urlencoded({ extended: true }));
var con = require('./../mysql/connection.js');

app.get("/create-user",function(req,res){

    res.send("hello world"+req.query.id);
});
app.post("/create-user",function(req,res){

    if(req.body.email && req.body.password){
        password=md5(md5(req.body.password)+md5(constants.PASS_SALT));
        user_id=md5(md5(req.body.email)+md5(constants.PASS_SALT));
        contact={
            primary_email:req.body.email
        };
        date=new Date();
            con.query("INSERT INTO users (email,password,user_id,contact,reg_time) values('"+req.body.email+"','"+password+"','"+user_id+"','"+JSON.stringify(contact)+"','"+date.getTime()/1000+"')",function(err,states){
                    if(err){
                            if(err.code=="ER_DUP_ENTRY"){
                                res.statusCode = 409;
                                res.send({"status":0});
                            }
                    }
                    if(states){
                            res.send({"status":1});
                    }

            });
    }else{
        res.statusCode = 400;
        res.send({"status":0});
    }

});
module.exports=app;
