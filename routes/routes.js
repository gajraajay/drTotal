var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var md5 = require('md5');

var app = express();

app.use(cookieParser());

var constants = require('./../utils/constants.js');
app.use(bodyParser.urlencoded({extended: true}));

var Sequelize = require('sequelize');

var UserSession = require('./../models/UserSession.js');
var userRole = require('./../models/user_roles.js');

var isValidate=require('./../middlewares/validate_user.js');



app.use("/user/", isValidate);
app.get('/user/', function(req, res) {
    res.send({"status": req.userid});
});

app.post('/user/role/', function(req, res) {
    if (req.body.role) {
        userRole
            .create({userId: req.userid, roleIds: req.body.role})
            .then(function(userrole) {
                res.send({"status": 1});
            }, function(err) {
                res.statusCode = 409;
                res.send({"status": 0});
            })
    }
});
module.exports = app;
