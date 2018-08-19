var express = require("express");
var routes = require('./routes/routes.js');
const CONSTANTS = require('./utils/constants.js');
var app = express();
const User = require('./models/user.js');
const UserMeta = require('./models/UserSession.js');
const user_role = require('./models/user_roles.js');
const role = require('./models/roles.js');
var UserSession = require('./models/UserSession.js');
var Sequelize = require('sequelize');
var jwt = require('jwt-express');

var time = 0;

const Op = Sequelize.Op;

// (function timerTask(){     let currentTime=new Date().getTime()/1000;
// UserSession.destroy({             where :{                 timeout : {
//       [Op.lte]:currentTime                 }             }         });
// time=currentTime;     setTimeout(timerTask,5000,'happy'); })();

let addHeader = function (req, res, next) {
  try {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  } catch (e) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.host);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Token");
  res.header('Access-Control-Allow-Credentials', true);
  next();
}
app.use(addHeader);
app.use(jwt.init((req,data) => {
  return "helloworld" 
}, {
  cookies: false,
  refresh: true
}));

routes.use('/api/v1/', require('./routes/openRoutes.js'));

app.use(routes);

app.listen(7071, function () {


  UserMeta
    .sync()
    .then(function (arg1) {
      
    });
  User
    .sync()
    .then(function (arg1) {
      
    });
  role
    .sync({force: true})
    .then(function (roles) {
      roles
        .create({
          roleId: 1,
          roleName: "doctor",
          roleRules: JSON.stringify(CONSTANTS.DOCTOR_ACL)
        })
        .then(function () {}, function (err) {
          
        });
      roles
        .create({
          roleId: 2,
          roleName: "patient",
          roleRules: JSON.stringify(CONSTANTS.PATIENT_ACL)
        })
        .then(function () {}, function (err) {
          
        });
      roles
        .create({roleId: 0, roleName: "su", roleRules: "{}"})
        .then(function () {}, function (err) {
          
        });
      
    })
  user_role
    .sync()
    .then(function (user_roles) {
      
    });

    User.hasMany(user_role, {foreignKey: 'userId'})
    user_role.belongsTo(User, {foreignKey: 'userId'});
    role.hasMany(user_role, {foreignKey: 'roleIds'})
    user_role.belongsTo(role, {foreignKey: 'roleIds'});
});