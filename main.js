var express = require("express");
var routes = require('./routes/routes.js');
var userModle = require('./models/users.js');
var app = express();
const Sequelize=require('sequelize');
const sequelize=require('./mysql/database');
const UserMeta=sequelize.define("userMeta",{
  firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });
  UserMeta.sync().then(function(arg1,arg2){

    arg1.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });
UserMeta.findAll().then(users=>{

  users.forEach(function(currentValue, index, arr){
    user=JSON.parse(JSON.stringify(currentValue),true);
    console.log(user.createdAt);
  });
});

routes.use('/api/v1/', require('./routes/openRoutes.js'));
app.use(routes);

app.listen(9090, function() {
});
