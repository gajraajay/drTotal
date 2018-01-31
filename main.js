var express = require("express");
var routes = require('./routes/routes.js');
var userModle = require('./models/users.js');
var app = express();

const UserMeta = require('./models/user.js');

routes.use('/api/v1/', require('./routes/openRoutes.js'));
app.use(routes);

app.listen(8081, function() {
    UserMeta
        .sync()
        .then(function(arg1) {
            console.log(arg1 + "table created");
        });
    });
