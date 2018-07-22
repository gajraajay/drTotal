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
var sequelize = require('./../mysql/database.js');
var User = require('./../models/user.js');
var UserSession = require('./../models/UserSession.js');
var UserRole = require('./../models/user_roles.js');
var roles = require('./../models/roles.js');
var jwt = require('jwt-express');
const Op = Sequelize.Op;

app.get("/demo", function (req, res, data) {
  res.send(res.jwt({name: 'something', token: 'hey-something'}));
});
app.post("/validate-user", function (req, res) {
  User.hasMany(UserRole, {foreignKey: 'userId'})
  UserRole.belongsTo(User, {foreignKey: 'userId'})
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
              })
                .then(usersMeta => {
                  if (usersMeta.length > 0) {
                    console.log(users[0].user_id, usersMeta[0].userId + ':' + req.get('Token'));
                    if (users[0].user_id == usersMeta[0].userId) {}
                    UserRole
                      .find({
                      where: {
                        userId: users[0].user_id
                      }
                    })
                      .then(userRole => {
                        console.log("role");
                        console.log(userRole);
                      }, err => {
                        console.log("Error");
                        console.log(err);

                      });

                    res.send({
                      auth_token: usersMeta[0].cookieKey,
                      jwt: res
                        .jwt({c_session: usersMeta[0].cookieKey})
                        .token,
                      status: 1,
                      user: {
                        contact: users[0].contact,
                        email: users[0].email,
                        firstName: users[0].firstName,
                        id: users[0].id,
                        lastName: users[0].lastName,
                        meta_info: users[0].meta_info,
                        reg_time: users[0].reg_time,
                        user_id: users[0].user_id
                      }

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
                        userId: users[0].user_id
                      })
                      .then(function (meta) {
                        UserRole
                          .find({
                          where: {
                            userId: users[0].user_id
                          }
                        })
                          .then(userRole => {
                            if (userRole != null) {
                              res.send({
                                auth_token: authToken,
                                jwt: res
                                  .jwt({c_session: cookieKey})
                                  .token,
                                status: 1,
                                role: userRole,
                                user: {
                                  contact: users[0].contact,
                                  email: users[0].email,
                                  firstName: users[0].firstName,
                                  id: users[0].id,
                                  lastName: users[0].lastName,
                                  meta_info: users[0].meta_info,
                                  reg_time: users[0].reg_time,
                                  user_id: users[0].user_id
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
                                      .jwt({c_session: cookieKey})
                                      .token,
                                    status: 1,
                                    role: 0,
                                    roles: rolesList,
                                    user: {
                                      contact: users[0].contact,
                                      email: users[0].email,
                                      firstName: users[0].firstName,
                                      id: users[0].id,
                                      lastName: users[0].lastName,
                                      meta_info: users[0].meta_info,
                                      reg_time: users[0].reg_time,
                                      user_id: users[0].user_id
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
                  userId: users[0].user_id
                })
                .then(function (meta) {
                  res.send({
                    auth_token: authToken,
                    jwt: res
                      .jwt({c_session: cookieKey})
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
          res.send({"status": 0, user_id: req.body.email});
        }
      }, err => {
        console.log(err);
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

    UserSession
      .findAll({
        where: {
          authToken: req.body.token
        }
      })
      .then(function (UserSessions) {
        console.log(UserSessions);
        var currentUserId = UserSessions[0].userId;
        return sequelize.transaction(function (t) {
          return UserRole.create({
            roleIds: JSON
              .parse(req.body.role)
              .roleId,
            userId: UserSessions[0].userId
          }, {transaction: t})
            .then(function (userRole) {

              var name = req
                .body
                .name
                .split(" ");

              if (name.length < 2) {
                name.push("");
              }

              return User.update({
                firstName: name[0],
                lastName: name[1]
              }, {
                where: {
                  user_id: userRole.userId
                }
              }, {transaction: t});
            });
        })
          .then(function (result) {
            User
              .find({
              where: {
                user_id: currentUserId
              }
            })
              .then((user) => {
                var currentUser = {
                  contact: contact,
                  email: user.email,
                  firstName: user.firstName,
                  id: user.id,
                  lastName: user.lastName,
                  meta_info: user.meta_info,
                  reg_time: user.reg_time,
                  user_id: user.user_id
                }
                res.send({
                  role: JSON.parse(req.body.role),
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

          })
          .catch(function (err) {
            res.statusCode = 409;
            res.send({error: 'conflict', state: ''});
          });
      }, function (err) {
        res.statusCode = 401;
        res.send({error: 'auth', state: ''});
      });

  } else {
    res.statusCode = 400;
    res.send({error: 'bad_req', state: ''});
  }
});

app.post("/create-user", function (req, res) {
  if (req.body.email && req.body.password) {

    password = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email));
    user_id = md5(md5(req.body.email) + md5(constants.PASS_SALT));

    contact = {
      primary_email: req.body.email
    };

    date = new Date();

    User.create({
      contact: JSON.stringify(contact),
      email: req.body.email,
      password: password,
      reg_time: date.getTime() / 1000,
        user_id: user_id
      })
      .then(function (user) {
        var currentUser = {
          contact: contact,
          email: user.email,
          firstName: user.firstName,
          id: user.id,
          lastName: user.lastName,
          meta_info: user.meta_info,
          reg_time: user.reg_time,
          user_id: user.user_id
        }
        console.log(user);
        date = new Date();
        authToken = md5(md5(req.body.password) + md5(constants.PASS_SALT) + md5(req.body.email) + md5(date.getTime()));
        cookieKey = md5(authToken + md5(date.getTime()));
        UserSession.create({
          authToken: authToken,
          cookieKey: cookieKey,
          inTime: date.getTime() / 1000,
          timeout: (date.getTime() / 1000) + (1000),
            userId: user.user_id
          })
          .then(function (meta) {
            roles.findAll({
              where: {
                roleId: {
                  [Op.gt]: 0
                  }
                }
              })
              .then(function (userRoles) {
                res.send({
                  auth_token: authToken,
                  jwt: res
                    .jwt({c_session: cookieKey})
                    .token,
                  name: '',
                  role: 0,
                  roles: userRoles,
                  status: 1,
                  user_id: req.body.email,
                  user: currentUser
                });
              }, function (err) {
                res.send({
                  auth_token: authToken,
                  jwt: res
                    .jwt({c_session: cookieKey})
                    .token,
                  name: '',
                  role: 0,
                  status: 1,
                  status: 1,
                  user_id: req.body.email,
                  user: {}
                });
              });

          }, function (err) {
            res.send({user: {}, status: 0, user_id: req.body.email});
          });
      }, function (arg2, arg1) {
        res.statusCode = 409;
        res.send({"status": 0, user: {}, user_id: req.body.email});
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
  res.send("err")
});

module.exports = app;
