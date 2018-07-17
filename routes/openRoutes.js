var express = require( "express" );
var bodyParser = require( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var md5 = require( 'md5' );
var app = express( );
app.use(cookieParser( ));
var constants = require( './../utils/constants.js' );
app.use(bodyParser.urlencoded({ extended: true }));
// var con = require('./../mysql/connection.js');
var Sequelize = require( 'sequelize' );
var User = require( './../models/user.js' );
var UserSession = require( './../models/UserSession.js' );
var UserRole = require( './../models/user_roles.js' );
var roles = require( './../models/roles.js' );
var jwt = require( 'jwt-express' );
const Op = Sequelize.Op;

app.get( "/demo", function ( req, res, data ) {
  res.send(res.jwt({ name: 'something', token: 'hey-something' }));
});
app.post( "/validate-user", function ( req, res ) {
  if ( req.body.email && req.body.password ) {
    User.findAll({
      where: {
        email: req.body.email
      }
    }).all( ).then(users => {
      if ( users.length == 1 ) {
        if (users[0].password === md5(md5( req.body.password ) + md5( constants.PASS_SALT ) + md5( req.body.email ))) {
          if (req.get( 'Token' )) {
            UserSession.findAll({
              where: {
                cookieKey: req.get( 'Token' )
              }
            }).then(usersMeta => {
              if ( usersMeta.length > 0 ) {
                if ( users[0].user_id == usersMeta[0].userId ) {}
                res.send({
                  auth_token: usersMeta[0].cookieKey,
                  jwt: res.jwt({ c_session: usersMeta[0].cookieKey }).token,
                  status: 1
                });
              } else {
                date = new Date( );
                authToken = md5(md5( req.body.password ) + md5( constants.PASS_SALT ) + md5( req.body.email ) + md5(date.getTime( )));
                cookieKey = md5(authToken + md5(date.getTime( )));
                UserSession.create({
                  authToken: authToken,
                  cookieKey: cookieKey,
                  inTime: date.getTime( ) / 1000,
                  timeout: ( date.getTime( ) / 1000 ) + ( 1000 ),
                  userId: users[0].user_id
                }).then( function ( meta ) {
                  res.send({
                    auth_token: cookieKey,
                    jwt: res.jwt({ c_session: cookieKey }).token,
                    status: 1,
                    user_id: req.body.email
                  });
                }, function ( err ) {
                  res.send({ error: err, status: 0, user_id: req.body.email });
                });
              }

            }, err => {
              console.log( err );
            });
          } else {
            date = new Date( );
            authToken = md5(md5( req.body.password ) + md5( constants.PASS_SALT ) + md5( req.body.email ) + md5(date.getTime( )));
            cookieKey = md5(authToken + md5(date.getTime( )));
            UserSession.create({
              authToken: authToken,
              cookieKey: cookieKey,
              inTime: date.getTime( ) / 1000,
              timeout: ( date.getTime( ) / 1000 ) + ( 1000 ),
              userId: users[0].user_id
            }).then( function ( meta ) {
              res.send({
                auth_token: cookieKey,
                jwt: res.jwt({ c_session: cookieKey }).token,
                status: 1,
                user_id: req.body.email
              });
            }, function ( err ) {
              console.log( err );
              res.send({ status: 0, user_id: req.body.email });
            });
          }
        } else {
          res.statusCode = 401;
          res.send({ "status": 0, user_id: req.body.email });
        }
      } else {
        res.send({ "status": 0, user_id: req.body.email });
      }
    }, err => {
      console.log( err );
      res.statusCode = 409;
      res.send({ "status": 0, user_id: req.body.email });

    });

  } else {
    res.statusCode = 400;
    res.send({ "status": 0, user_id: req.body.email });
  }

});

app.post( "/profile", jwt.active( ), function ( req, res ) {


Sequelize.transaction(function(t){
    return UserSession.create({
        authToken: 123,
        cookieKey: 1234,
        inTime: new Date().getTime( ) / 1000,
        timeout: ( new Date().getTime( ) / 1000 ) + ( 1000 ),
        userId: user.user_id
    },{transaction:t}).then(session=>{
        console.log(session);
    });
}).then(function(result){
    console.log(result);
}).catch(function(err){
    console.log(err)
});

  if ( req.body.name && req.body.role ) {
  
    UserSession.findAll({
      where: {
        authToken: req.body.token
      }
    }).then( function ( UserSessions ) {
  
        UserRole.create({
        roleIds: JSON.parse( req.body.role ).roleId,
        userId: UserSessions[0].userId
      }).then( function ( UserRole ) {
        console.log( UserRole );
        res.send( UserRole );
      }, function ( err ) {
        res.statusCode = 409;
        res.send({ err_rsn: 'conflict', role_status: 0 })
      });
    }, function ( err ) {
      res.statusCode = 401;
      res.send( "401" );
    });

  } else {
    res.statusCode = 302;
    res.send( "something missing" );
  }

});

app.post( "/create-user", function ( req, res ) {
  if ( req.body.email && req.body.password ) {

    password = md5(md5( req.body.password ) + md5( constants.PASS_SALT ) + md5( req.body.email ));
    user_id = md5(md5( req.body.email ) + md5( constants.PASS_SALT ));

    contact = {
      primary_email: req.body.email
    };

    date = new Date( );

    User.create({
      contact: JSON.stringify( contact ),
      email: req.body.email,
      password: password,
      reg_time: date.getTime( ) / 1000,
      user_id: user_id
    }).then( function ( user ) {
      date = new Date( );
      authToken = md5(md5( req.body.password ) + md5( constants.PASS_SALT ) + md5( req.body.email ) + md5(date.getTime( )));
      cookieKey = md5(authToken + md5(date.getTime( )));
      UserSession.create({
        authToken: authToken,
        cookieKey: cookieKey,
        inTime: date.getTime( ) / 1000,
        timeout: ( date.getTime( ) / 1000 ) + ( 1000 ),
        userId: user.user_id
      }).then( function ( meta ) {
        roles.findAll({
          where: {
            roleId: {
              [ Op.gt ]: 0
            }
          }
        }).then( function ( userRoles ) {
          res.send({
            auth_token: authToken,
            jwt: res.jwt({ c_session: cookieKey }).token,
            roles: userRoles,
            status: 1,
            name:'',
            role:0,
            user_id: req.body.email
          });
        }, function ( err ) {          
          res.send({
            auth_token: authToken,
            jwt: res.jwt({ c_session: cookieKey }).token,
            status: 1,
            status: 1,
            name:'',
            role:0,
            user_id: req.body.email
          });
        });

      }, function ( err ) {   
        res.send({ status: 0, user_id: req.body.email });
      });
    }, function ( arg2, arg1 ) {
      res.statusCode = 409;
      res.send({ "status": 0, user_id: req.body.email });
    });
  } else {
    res.statusCode = 400;
    res.send({ "status": 0, user_id: req.body.email });
  }

});

app.use( function ( err, req, res, next ) {
  if ( err.name == 'JWTExpressError' ) {
    res.status( 401 );
  } else {
    console.log( err );
    res.status( 500 );
  }
  res.send( "err" )
});

module.exports = app;
