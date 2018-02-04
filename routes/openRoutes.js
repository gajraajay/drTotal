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

const Op = Sequelize.Op;

app.post("/demo", function(req, res) {
    console.log(req.cookies.cookiename);
    res.send("hello world" + req.query.id);
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
                      console.log(req.cookies);
                        if (req.cookies.dt_auth_token) {
                            UserSession
                                .findAll({
                                where: {
                                    authToken: req.cookies.dt_auth_token
                                }
                            })
                                .then(usersMeta => {
                                    if (usersMeta.length > 0) {
                                        res.send({status: 1, auth_key: req.cookies.dt_auth_token});
                                    } else {
                                        date = new Date();
                                        authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
                                        UserSession.create({
                                            authToken: authToken,
                                            userId: users[0].user_id,
                                            inTime: date.getTime(),
                                            timeout: date.getTime() + (12 * 24 * 3600)
                                            })
                                            .then(function(meta) {
                                                res.cookie('dt_auth_token', authToken, {
                                                    maxAge: 900000,
                                                    httpOnly: false
                                                });
                                                res.send({status: 1, auth_key: authToken});
                                            }, function(err) {
                                                res.send({status: 0, error: err});
                                            });
                                    }

                                }, err => {
                                    console.log(err);
                                });
                        } else {
                            console.log("notdound");
                            date = new Date();
                            authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
                            UserSession.create({
                                authToken: authToken,
                                userId: users[0].user_id,
                                inTime: date.getTime(),
                                timeout: date.getTime() + (12 * 24 * 3600)
                                })
                                .then(function(meta) {
                                  console.log(meta);
                                    res.cookie('dt_auth_token', authToken, {
                                        maxAge: 900000,
                                        httpOnly: false
                                    });
                                    res.send({status: 1, auth_key: authToken});
                                }, function(err) {
                                    console.log(err);
                                    res.send({status: 3, auth_key: req.cookies.dt_auth_token});
                                });

                        }

                        //TODO store the key to database and use for future authentication guve it a validity.
                    } else {
                        res.statusCode = 401;
                        res.send({"status": 0});
                    }
                } else {
                    res.send({"status": 0});
                }
            }, err => {
                console.log(err);
                res.statusCode = 409;
                res.send({"status": 0});

            });

    }

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
              date=new Date();
              authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
              cookieKey=md5(authToken+md5(date.getTime()));
              UserSession.create({
                  authToken: authToken,
                  cookieKey:cookieKey,
                  userId: user_id,
                  inTime: date.getTime(),
                  timeout: date.getTime() + (12 * 24 * 3600)
                  })
                  .then(function(meta) {
                    console.log(meta);
                      res.cookie('dt_auth_key', cookieKey, {
                          maxAge: 900000,
                          httpOnly: false
                      });
                      res.send({status: 1,auth_token:authToken});
                  }, function(err) {
                      console.log(err);
                      res.send({status: 0});
                  });
            }, function(arg2, arg1) {
                res.statusCode = 409;
                res.send({"status": 0});
            });

        //  con.query("INSERT INTO users (email,password,user_id,contact,reg_time) values('" + req.body.email + "','" + password + "','" + user_id + "','" + JSON.stringify(contact) + "','" + date.getTime() / 1000 + "')", function(err, states) {
        //     if (err) {
        //         if (err.code == "ER_DUP_ENTRY") {
        //             res.statusCode = 409;
        //             res.send({"status": 0});
        //         }
        //     }
        //     if (states) {
        //         res.send({"status": 1});
        //         UserMeta.create({firstName: 'John', lastName: 'Hancock'});
        //
        //     }
        //
        // });

    } else {
        res.statusCode = 400;
        res.send({"status": 0});
    }

});
module.exports = app;
