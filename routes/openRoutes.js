var express = require("express");
var bodyParser = require('body-parser');
var md5 = require('md5');
var app = express();
var constants = require('./../utils/constants.js');
app.use(bodyParser.urlencoded({
  extended: true
}));
// var con = require('./../mysql/connection.js');
var Sequelize = require('sequelize');
var UserMeta = require('./../models/user.js');


const Op = Sequelize.Op;

app.get("/create-user", function(req, res) {
  res.send("hello world" + req.query.id);
});
app.post("/validate-user", function(req, res) {

  // console.log(Sequelize.model('Meta'));
  if (req.body.email && req.body.password) {
    UserMeta.findAll({
      where: {
        email: req.body.email
      }
    }).all().then(users => {
      if (users.length == 1) {
        if(users[0].password===md5(md5(req.body.password) + md5(constants.PASS_SALT)+md5(req.body.email))){
        res.send({
          "status": 1
        });}else{
          res.statusCode=401;
          res.send({"status":0});
        }
      } else {
        res.send({
          "status": 0
        });

      }
      // users
      //     .forEach(function(currentValue, index, arr) {
      //         user = JSON.parse(JSON.stringify(currentValue), true);
      //         console.log(user.email);
      //     });
    }, err => {
      console.log(err);
      res.statusCode = 409;
      res.send({
        "status": 0
      });

    });

  }

});
app.post("/create-user", function(req, res) {

  if (req.body.email && req.body.password) {
    password = md5(md5(req.body.password) + md5(constants.PASS_SALT)+md5(req.body.email));
    user_id = md5(md5(req.body.email) + md5(constants.PASS_SALT));
    contact = {
      primary_email: req.body.email
    };
    date = new Date();
    UserMeta.create({
        email: req.body.email,
        password: password,
        user_id: user_id,
        contact: JSON.stringify(contact),
        reg_time: date.getTime() / 1000
      })
      .then(function(arg1) {
        res.send({
          "status": 1
        });
      }, function(arg2, arg1) {
        res.statusCode = 409;
        res.send({
          "status": 0
        });
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
    res.send({
      "status": 0
    });
  }

});
module.exports = app;
