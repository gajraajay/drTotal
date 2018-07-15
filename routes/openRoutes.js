var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var md5 = require('md5');
var app = express();
app.use(cookieParser());
var constants = require('./../utils/constants.js');
app.use(bodyParser.urlencoded({extended: true}));
// var con = require('./../mysql/connection.js');
var Sequelize = require('sequelize');
var User = require('./../models/user.js');
var UserSession = require('./../models/UserSession.js');
var roles = require('./../models/roles.js');
var jwt=require('jwt-express');
const Op = Sequelize.Op;


app.get("/demo", function(req, res,data) {        
    res.send(jwt.create('cool',{name:'something',token:'hey-something'}));        
});
app.post("/validate-user", function(req, res) {
    if (req.body.email && req.body.password) {
        User
            .findAll({
            where: {
                email: req.body.email
            }
        })
            .all()
            .then(users => {
                if (users.length == 1) {
                    if (users[0].password === md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email))) {                        
                        if (req.get('Token')) {
                            UserSession
                                .findAll({
                                where: {
                                    cookieKey: req.get('Token')
                                }
                            }).then(usersMeta => {
                                    if (usersMeta.length > 0) {
                                        if(users[0].user_id==usersMeta[0].userId){                                            
                                        }
                                        res.send({status: 1, auth_token: usersMeta[0].cookieKey,jwt:jwt.create('dummy-screte',{c_session:usersMeta[0].cookieKey}).token});
                                    } else {
                                        date = new Date();
                                        authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
                                        cookieKey = md5(authToken + md5(date.getTime()));
                                        UserSession.create({
                                            authToken: authToken,
                                            cookieKey: cookieKey,
                                            userId: users[0].user_id,
                                            inTime: date.getTime() / 1000,
                                            timeout: (date.getTime() / 1000) + (1000)
                                            })
                                            .then(function(meta) {     
                                                res.send({status: 1,user_id:req.body.email,auth_token: cookieKey,jwt:jwt.create('dummy-screte',{c_session:cookieKey}).token});                                                
                                            }, function(err) {
                                                res.send({status: 0,user_id:req.body.email, error: err});
                                            });
                                    }

                                }, err => {
                                    console.log(err);
                                });
                        } else {
                            date = new Date();                            
                            authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
                            cookieKey = md5(authToken + md5(date.getTime()));
                            UserSession.create({
                                authToken: authToken,
                                cookieKey: cookieKey,
                                userId: users[0].user_id,
                                inTime: date.getTime() / 1000,
                                timeout: (date.getTime() / 1000) + (1000)
                                })
                                .then(function(meta) {                                    
                                    res.send({status: 1,user_id:req.body.email, auth_token: cookieKey});
                                }, function(err) {
                                    console.log(err);
                                    res.send({status: 0,user_id:req.body.email});
                                });
                        }
                    } else {
                        res.statusCode = 401;
                        res.send({"status": 0,user_id:req.body.email});
                    }
                } else {
                    res.send({"status": 0,user_id:req.body.email});
                }
            }, err => {
                console.log(err);
                res.statusCode = 409;
                res.send({"status": 0,user_id:req.body.email});

            });

    }else {
        res.statusCode = 400;
        res.send({"status": 0,user_id:req.body.email});
    }

});

app.post("/profile",function(req,res){
    
    console.log(req.jwt);
    res.send('helloworld');
});
app.post("/create-user", function(req, res) {
    if (req.body.email && req.body.password) {
        password = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email));
        user_id = md5(md5(req.body.email) + md5(constants.PASS_SALT));
        contact = {
            primary_email: req.body.email
        };
        date = new Date();
        User.create({
            email: req.body.email,
            password: password,
            user_id: user_id,
            contact: JSON.stringify(contact),
            reg_time: date.getTime() / 1000
            })
            .then(function(arg1) {
                date = new Date();
                authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
                cookieKey = md5(authToken + md5(date.getTime()));
                UserSession.create({
                    authToken: authToken,
                    cookieKey: cookieKey,
                    userId: user_id,
                    inTime: date.getTime() / 1000,
                    timeout: (date.getTime() / 1000) + (1000),
                    })
                    .then(function(meta) {                      
                        roles
                            .findAll({where:{
                                roleId:{
                                    [Op.gt]: 0,
                                }
                            }})
                            .then(function(userRoles) {
                                res.send({status: 1,user_id:req.body.email, auth_token: authToken, roles: userRoles});
                            }, function(err) {
                                console.log(err);
                                res.send({status: 1,user_id:req.body.email, auth_token: authToken});
                            });

                    }, function(err) {
                        console.log(err);
                        res.send({status: 0,user_id:req.body.email});
                    });
            }, function(arg2, arg1) {
                res.statusCode = 409;
                res.send({"status": 0,user_id:req.body.email});
            });
    } else {
        res.statusCode = 400;
        res.send({"status": 0,user_id:req.body.email});
    }

});
module.exports = app;
