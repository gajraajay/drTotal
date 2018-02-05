var express = require("express");
var routes = require('./routes/routes.js');
var userModle = require('./models/users.js');
const CONSTANTS = require('./utils/constants.js');
var app = express();
const User = require('./models/user.js');
const UserMeta = require('./models/UserSession.js');
const user_role = require('./models/user_roles.js');
const role = require('./models/roles.js');

routes.use('/api/v1/', require('./routes/openRoutes.js'));
app.use(routes);

app.listen(8081, function() {
    UserMeta
        .sync()
        .then(function(arg1) {
            console.log(arg1 + "table created");
        });
    User
        .sync()
        .then(function(arg1) {
            console.log(arg1 + "table created");
        });
    role
        .sync({force: true})
        .then(function(roles) {
            roles
                .create({
                    roleId: 1,
                    roleName: "doctor",
                    roleRules: JSON.stringify(CONSTANTS.DOCTOR_ACL)
                })
                .then(function() {}, function(err) {
                    console.log(err.message);
                });
            roles
                .create({
                    roleId: 2,
                    roleName: "patient",
                    roleRules: JSON.stringify(CONSTANTS.PATIENT_ACL)
                })
                .then(function() {}, function(err) {
                    console.log(err.message);
                });
            roles
                .create({roleId: 0, roleName: "su", roleRules: "{}"})
                .then(function() {}, function(err) {
                    console.log(err.message);
                });
            console.log(roles + "created");
        })
    user_role
        .sync()
        .then(function(user_roles) {
            console.log(user_roles + "created");
        });
});
