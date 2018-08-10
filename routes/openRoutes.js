var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var md5 = require('md5');
var app = express();

app.use(cookieParser());

var constants = require('./../utils/constants.js');

app.use(bodyParser.urlencoded({extended: true}));

var Sequelize = require('sequelize');
var sequelize = require('./../mysql/database.js');
var User = require('./../models/user.js');
var UserSession = require('./../models/UserSession.js');
var UserRole = require('./../models/user_roles.js');
var roles = require('./../models/roles.js');
var jwt = require('jwt-express');
const Op = Sequelize.Op;
var responseHelper = require('./../helpers/responseHelper.js');

app.get("/demo", function (req, res, data) {

  // responseHelper.sendError(req,res,res.jwt({name: 'something', token:
  // 'hey-something'}));
  res.send(res.jwt({name: 'something', token: 'hey-something'}));
});

app.post("/validate-user", function (req, res) {

  if (req.body.email && req.body.password) {
    User
      .find({
      where: {
        email: req.body.email
      }
    })
      .then(User => {
      
        if (User != null) {
          if (User.password === md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email))) {

            if (req.get('Token')) {
              UserSession
                .find({
                where: {
                  cookieKey: req.get('Token')
                }
              })
                .then(UsersMeta => {
                  if (UsersMeta != null) {
                    if (User.user_id == usersMeta.userId) {}
                    UserRole
                      .find({
                      where: {
                        userId: User.user_id
                      }
                    })
                      .then(userRole => {
                        if (userRole != null) {
                          res.send({
                            auth_token: UsersMeta.cookieKey,
                            jwt: res
                              .jwt({c_session: UsersMeta.cookieKey, user_id: User.user_id})
                              .token,
                            role: userRole,
                            status: 1,
                            user: {
                              contact: User.contact,
                              email: User.email,
                              firstName: User.firstName,
                              id: User.id,
                              lastName: User.lastName,
                              meta_info: User.meta_info,
                              reg_time: User.reg_time,
                              user_id: User.user_id
                            }
                          });

                        } else {
                          roles
                            .findAll({})
                            .then(rolesList => {
                              res.send({
                                auth_token: UsersMeta.cookieKey,
                                jwt: res
                                  .jwt({c_session: UsersMeta.cookieKey,user_id: User.user_id})
                                  .token,
                                role: 0,
                                roles: rolesList,
                                status: 1,
                                user: {
                                  contact: User.contact,
                                  email: User.email,
                                  firstName: User.firstName,
                                  id: User.id,
                                  lastName: User.lastName,
                                  meta_info: User.meta_info,
                                  reg_time: User.reg_time,
                                  user_id: User.user_id
                                },
                                user_id: req.body.email
                              });

                            }, err => {
                              res.send({error: err, status: 0, user_id: req.body.email});
                            });
                        }
                      }, err => {
                        console.log("Error");
                        console.log(err);
                      });

                  } else {
                    
                    date = new Date();
                    authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
                    cookieKey = md5(authToken + md5(date.getTime()));

                    UserSession.create({
                      authToken: authToken,
                      cookieKey: cookieKey,
                      inTime: date.getTime() / 1000,
                      timeout: (date.getTime() / 1000) + (1000),
                        userId: User.user_id
                      })
                      .then(function (meta) {
                        UserRole
                          .find({
                            include: [{
                              model: roles
                            }],
                          where: {
                            userId: User.user_id
                          }
                        })
                          .then(userRole => {                            
                            if (userRole != null) {
                              res.send({
                                auth_token: authToken,
                                jwt: res
                                  .jwt({c_session: cookieKey,user_id: User.user_id})
                                  .token,
                                role: userRole,
                                status: 1,
                                user: {
                                  contact: User.contact,
                                  email: User.email,
                                  firstName: User.firstName,
                                  id: User.id,
                                  lastName: User.lastName,
                                  meta_info: User.meta_info,
                                  reg_time: User.reg_time,
                                  user_id: User.user_id
                                },
                                user_id: req.body.email
                              });
                            } else {
                              roles
                                .findAll({})
                                .then(rolesList => {
                                  res.send({
                                    auth_token: authToken,
                                    jwt: res
                                      .jwt({c_session: cookieKey,user_id: User.user_id})
                                      .token,
                                    role: 0,
                                    roles: rolesList,
                                    status: 1,
                                    user: {
                                      contact: User.contact,
                                      email: User.email,
                                      firstName: User.firstName,
                                      id: User.id,
                                      lastName: User.lastName,
                                      meta_info: User.meta_info,
                                      reg_time: User.reg_time,
                                      user_id: User.user_id
                                    },
                                    user_id: req.body.email
                                  });

                                }, err => {
                                  res.send({error: err, status: 0, user_id: req.body.email});
                                });
                            }

                          }, err => {
                            console.log("Error");
                            console.log(err);

                          });

                      }, function (err) {
                        res.send({error: err, status: 0, user_id: req.body.email});
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
                inTime: date.getTime() / 1000,
                timeout: (date.getTime() / 1000) + (1000),
                  userId: User.user_id
                })
                .then(function (meta) {
                  res.send({
                    auth_token: authToken,
                    jwt: res
                      .jwt({c_session: cookieKey,user_id: User.user_id})
                      .token,
                    status: 1,
                    user_id: req.body.email
                  });
                }, function (err) {
                  console.log(err);
                  res.send({status: 0, user_id: req.body.email});
                });
            }
          } else {
            res.statusCode = 401;
            res.send({"status": 0, user_id: req.body.email});
          }
        } else {
          res.statusCode = 409;
          res.send({"status": 0, user_id: req.body.email});
        }
      }, err => {
        res.statusCode = 409;
        res.send({"status": 0, user_id: req.body.email});

      });

  } else {
    res.statusCode = 400;
    res.send({"status": 0, user_id: req.body.email});
  }

});

/**
 * Post method to update the user information and complete the profile.
 * accepts Name and role as the form-para.
 * should be called imidiatly after signup process to complete the registration process.
 * returns current user state.
 */
app.post("/profile", jwt.active(), function (req, res) {

  if (req.body.name && req.body.role) {
    let currentUserId = req.jwt.payload.user_id;
    let name = req
      .body
      .name
      .split(" ");
    if (name.length < 2) {
      name.push("");
    }

    UserSession
      .find({
      where: {
        authToken: req.body.token
      }
    })
      .then((UserSession) => {
        return sequelize.transaction((t) => {
          return UserRole.create({
            roleIds: JSON
              .parse(req.body.role)
              .roleId,
            userId: currentUserId
          }, {transaction: t}).then((userRole) => {
            return User.update({
              firstName: name[0],
              lastName: name[1]
            }, {
              where: {
                user_id: currentUserId
              }
            }, {transaction: t});
          });
        }).then((result) => {
          User
            .find({              
            where: {
              user_id: currentUserId
            }
          })
            .then((user) => {
              var currentUser = {
                contact: user.contact,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                meta_info: user.meta_info,
                reg_time: user.reg_time,
                user_id: user.user_id
              }
              res.send({
                role: {...JSON.parse(req.body.role),Role:JSON.parse(req.body.role)},
                state: 'login',
                user: currentUser
              });

            }, (err) => {
              var currentUser = {
                name: req.body.name
              }

              res.send({
                role: JSON.parse(req.body.role),
                state: 'login',
                user: currentUser
              });
            });

        }, (err) => {
          console.log('err',err);
          res.statusCode = 401;
          res.send({error: 'auth', state: ''});
        });
      }, (err) => {
        console.log('err1',err);
        res.statusCode = 401;
        res.send({error: 'auth', user: '', state: ''});
      });

  } else {
    res.statusCode = 400;
    res.send({error: 'bad_req', state: '', user: ''});
  }
});

/**
 * Post method to update the user information and complete the profile.
 * accepts Name and role as the form-para.
 * should be called imidiatly after signup process to complete the registration process.
 * returns current user state.
 */
app.post("/create-user", function (req, res) {

  if (req.body.email && req.body.password) {

    let date = new Date();
    let password = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email));
    let user_id = md5(md5(req.body.email) + md5(constants.PASS_SALT));
    let reg_time = date.getTime() / 1000;
    let authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
    let cookieKey = md5(authToken + md5(date.getTime()));
    let contact = {
      primary_email: req.body.email
    };

    sequelize.transaction(function (t) {
      return User.create({
        contact: JSON.stringify(contact),
        email: req.body.email,
        password: password,
        reg_time: reg_time,
        user_id: user_id
      }, {transaction: t})
        .then(function (user) {
          return UserSession.create({
            authToken: authToken,
            cookieKey: cookieKey,
            inTime: date.getTime() / 1000,
            timeout: (date.getTime() / 1000) + (1000),
            userId: user.user_id
          }, {transaction: t})
        });
    }).then((userSession) => {
      roles
        .findAll()
        .then(function (userRoles) {
          res.send({
            auth_token: authToken,
            jwt: res
              .jwt({c_session: cookieKey, user_id: user_id})
              .token,
            name: '',
            role: 0,
            roles: userRoles,
            status: 1,
            user: {
              contact: contact,
              email: req.body.email,
              firstName: 'User',
              lastName: 'Name',
              meta_info: null,
              reg_time: reg_time,
              user_id: user_id
            },
            user_id: req.body.email
          });
        }, function (err) {
          res.statusCode = 409;
          res.send({status: 0, user: {}, user_id: req.body.email});
        });
    }, (err) => {
      res.statusCode = 409;
      res.send({status: 0, user: {}, user_id: req.body.email});
    });
  } else {
    res.statusCode = 400;
    res.send({"status": 0, user: {}, user_id: req.body.email});
  }

});

app.use(function (err, req, res, next) {
  if (err.name == 'JWTExpressError') {
    res.status(401);
  } else {
    console.log(err);
    res.status(500);
  }
  res.send(err)
});

module.exports = app;
