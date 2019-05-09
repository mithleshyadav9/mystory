var jwt = require('jsonwebtoken');
var keys = require('../keys');
var User = require('../models/user');


exports.checkAuth = function( req, res, next ) {
  var token = req.headers['authorization'];

  if(token) {
    jwt.verify(token, keys.SECRET_KEY, function(err,decoded) {
        if(err) {
          console.log('jwt fn:',err);
          return res.status(422).json({errors:[{title:'Error',detail:'Unable to Process your request. Please try again later.'}]});

        }

        var user = decoded;
        User.findOne({_id:user._id})
            .select('-password')
            .exec(function(err,foundUser) {
              if(err) {
                console.log('jwt user:',err);
                return res.status(422).json({errors:[{title:'Error',detail:'Unable to Process your request. Please try again later.'}]});
              }
              if(!user) {
              return res.status(422).json({errors:[{title:'No User',detail:'Token is missing.Please Login.'}]});
              }

              res.locals.user = foundUser;
              next();
            });

    });
  } else {
    return res.status(422).json({errors:[{title:'No Token',detail:'Token is missing.Please Login.'}]});
  }


};


exports.checkUser = function( req, res, next ) {
  var token = req.headers['authorization'];

  if(token) {
    jwt.verify(token, keys.SECRET_KEY, function(err,decoded) {
        if(err) {
          console.log('jwt fn:',err);
          return res.status(422).json({errors:[{title:'Error',detail:'Unable to Process your request. Please try again later.'}]});

        }

        var user = decoded;
        User.findOne({_id:user._id})
            .select('-password')
            .exec(function(err,foundUser) {
              if(err) {
                console.log('jwt user:',err);
                return res.status(422).json({errors:[{title:'Error',detail:'Unable to Process your request. Please try again later.'}]});
              }
              if(!user) {
              return res.status(422).json({errors:[{title:'No User',detail:'Token is missing.Please Login.'}]});
              }

              res.locals.user = foundUser;
              next();
            });

    });
  } else {
    res.locals.user = false;
    next();
  }


};
