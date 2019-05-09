var router = require('express').Router();
var jwt = require('jsonwebtoken');
var keys = require('../keys');
var { ObjectId } = require('mongodb');
var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');

// const UUID = require('uuid-v4');
// const path = require('path');
// const os = require('os');
// const busBoy = require('busboy');
// const fs = require('fs');
// var {Storage} = require('@google-cloud/storage');
// const storage = new Storage({
//   projectId: 'uploadimage-65506',
//   keyFilename: 'uploadimage-65506-firebase-adminsdk-8clh1-8da6f0dff2.json'
// });


var transport = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: keys.SENGRID_API
  }
}));

var bcrypt = require('bcryptjs');

var User = require('../models/user');
var Story = require('../models/story');

var auth = require('../middleware/auth');

const checkUsername = (username) => {
  User.find({username:username})
      .exec(function(err,user) {
        if(err) {
          console.log(err);
          return false
        }
        if(!user) {
          return true;
        }
        return false;
      })
}

router.get('/change/:username',(req,res,next)=>{
  let username = req.params.username;
  username = username.trim();
  const user = '5c77cd7db1052d18a0a19677';
  if(checkUsername(username)) {
    User.findOne({_id:user._id})
        .exec(function(err,u) {
          if(err) {
            console.log(err);
            return res.status(422).json({errors:[{title:'Change Username',detail:'Sorry We\'re unable to process you Request.Please Try Again later.'}]})
          }
          u.chnageUsername(username);
          return res.status(200).json({res:true,msg:'Username Changed Successfully.'});
        })
  } else {
    return res.status(200).json({res:false,msg:'Username Already Taken.'});
  }

});


router.get('/me',auth.checkAuth,(req,res,next)=>{
  const user = res.locals.user;


  User.findOne({_id:user._id})
      .select('-password')
      .exec(function(err,user) {
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/me',detail:'Sorry We\'re unable to process you Request.Please Try Again later.'}]});
        }
        if(!user) {
          return res.status(422).json({errors:[{title:'/me',detail:'The User doesn\'t exists.'}]});
        }

        res.status(200).json(user);
        next();
      })
});


router.get('/stories',auth.checkAuth,(req,res,next)=>{
  const user = res.locals.user;


  User.findOne({_id:user._id})
      .select('stories')
      .deepPopulate('stories.writer')
      .exec(function(err,user) {

        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/stories',detail:'Sorry We\'re unable to process you Request.Please Try Again later.'}]});
        }
        if(!user) {
          return res.status(422).json({errors:[{title:'/stories',detail:'The User doesn\'t exists.'}]});
        }

        if(user.stories.length === 0) {
          return res.status(422).json({errors:[{title:'/stories',detail:'We would love to see Your Stories here.'}]});
        }

        res.status(200).json(user);
      });
});


router.get('/favourites',auth.checkAuth,(req,res,next)=>{
  const user = res.locals.user;

  User.findOne({_id:user._id})
      .select('favourites')
      .deepPopulate('favourites.writer')
      .exec(function(err,user) {

        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/favourites',detail:'Sorry We\'re unable to process you Request.Please Try Again later.'}]});
        }
        if(!user) {
          return res.status(422).json({errors:[{title:'/favourites',detail:'The User doesn\'t exists.'}]});
        }

        if(user.favourites.length === 0) {
          return res.status(422).json({errors:[{title:'/favourites',detail:'Your Favourites list empty.'}]});
        }

        res.status(200).json(user);
      });
});

router.get('/usernames', (req,res,next)=> {
  User.find({})
      .select('username')
      .exec(function(err,users) {
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/users',detail:'Sorry We\'re unable to process you Request.Please Try Again later.'}]});
        }
        if(!users) {
          return res.status(422).json({errors:[{title:'/users',detail:'No Users are found.'}]});
        }
        const usernames = [];
        users.map((user)=>{
          return usernames.push(user.username);
        })

        res.status(200).json(usernames);
        next();

      })
});

router.get('/users', (req, res, next)=> {
    User.find({})
        .select('-bio -website -registeredAt -password -favourites -publics')
        .exec(function(err,users) {
          if(err) {
            console.log(err);
            return res.status(422).json({errors:[{title:'/users',detail:'Sorry We\'re unable to process you Request.Please Try Again later.'}]});
          }
          if(!users) {
            return res.status(422).json({errors:[{title:'/users',detail:'No Users are found.'}]});
          }

          res.status(200).json(users);
          next();
        })
});



router.get('/user/:id', (req, res, next) => {
  const id = req.params.id;

  if(!ObjectId.isValid(id)) {
    return res.status(422).json({errors:[{title:'/user/:id',detail:'User associated with that Id doesn`t exists.'}]});

  }

  User.findOne({_id:id})
      .select('-password')
      .exec(function(err,user) {
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/user/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!user) {
          return res.status(422).json({errors:[{title:'/user/:id',detail:'User associated with that Id doesn`t exists.'}]});
        }

        res.status(200).json(user);
        next();
      });
});




router.post('/info',auth.checkAuth, ( req, res, next ) => {
  const { website, bio, fname, lname} = req.body;

  const user = res.locals.user;


  User.findOne({_id:user._id})
      .exec(function(err, user) {
        if(err) {
          return res.status(422).json({errors:[{title:'/info/:id',detail:'Unable to perform operation! Please try again later.'}]});
        }

        if(!user) {
          return res.status(422).json({errors:[{title:'/info/:id',detail:'User associated with that Id doesn`t exists.'}]});
        }

    if(fname !== '' )  {user.fname = fname;}
    if(lname !== '' )  {user.lname = lname;}
    if(bio !== '' )  {user.bio = bio;}
      // if(image !== '' ) { user.addImage(image); }
      if(website !== '' ) {
      user.website = website;
    }



    user.save()
        .then(() => {

          return res.status(200).json({res:true,msg: 'Profile Information has been Saved.'});

        }).catch((err) => {

            return res.status(422).json({errors:[{title:'/info/:id',detail:'Unable to perform operation! Please try again later.'}]});

        })

      })
});

router.post( '/user', ( req, res, next ) => {
  const { username, email, password } = req.body;


  User.findOne({email:email.toLowerCase()})
      .exec(function(err,user) {
        if(user) {
            return res.status(422).json({res:false,msg:'User with that Email already exists!'});
        }
        if(err) {
           console.log(err);
          return res.status(422).json({res:false,msg:'Unable to process your request. Please try again later.'});

        }

        User.findOne({username:username.toLowerCase()})
            .exec(function(err,user) {
              if(user) {
                  return res.status(422).json({res:false,msg:'User with that username already exists!'});
              }
              if(err) {
                 console.log(err);
                return res.status(422).json({res:false,msg:'Unable to process your request. Please try again later.'});

              }

              var salt = bcrypt.genSaltSync(10);
              var hash = bcrypt.hashSync(password, salt);

              var user = new User({
                username,
                email,
                password:hash
              });

              user
                  .save()
                  .then(()=>{
                    return res.status(200).json({res:true,msg:'New User has been added Successfully...!'});
                  })
                  .catch((e)=>{
                    console.log(e);
                    return res.status(422).json({res:false,msg:'Unable to process your request. Please try again later.'});

                    // var error =  new Error(e);
                    // error.status(422);
                    // return next(error);
                  })

            });
      });




});



router.post( '/login', ( req, res, next ) => {

const { username, password } = req.body;


User.findOne({$or: [{username:username},{email:username}]})
    .exec(function(err,user) {
      if(err) {
        console.log(err);
        return res.status(422).json({errors:[{title:'/login',detail:'Sorry We\'re unable to process you Request.Please Try Again later.'}]});

      }

      if(!user) {
        return res.status(422).json({errors:[{title:'/login',detail:'Login credentials didn\'t matched.'}]});
      }


      if(user.comparePassword(password)) {

        var token = jwt.sign({
            _id: user._id,
            username: user.username,
            email: user.email
        }, keys.SECRET_KEY,{ expiresIn: '7d'});

        res.status(200).json({token:token});

      } else {
        return res.status(422).json({errors:[{title:'/login',detail:'Login credentials didn\'t matched.'}]});
      }
    })
});

router.get('/hidden/verify/:id',(req,res,next)=>{
  const id = req.params.id;

  if(!ObjectId.isValid(id)) {
    return res.status(422).json({errors:[{title:'/user/:id',detail:'User associated with that Id doesn`t exists.'}]});

  }

  User.findOne({_id:id})
      .exec(function(err,user) {
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/user/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!user) {
          return res.status(422).json({errors:[{title:'/user/:id',detail:'User associated with that Id doesn`t exists.'}]});
        }

        user.verify();

        res.status(200).json({res:true,msg:'User has been Verified.'});
        next();
      });
})

router.post('/user/change/password',auth.checkAuth,(req,res,next)=>{

  const { oldp, newp } = req.body;

  const user = res.locals.user;

  User.findOne({ _id:user._id })
      .exec(function(err,user){
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/user/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!user) {
          return res.status(422).json({errors:[{title:'/user/:id',detail:'User associated with that Id doesn`t exists.'}]});
        }

        if(user.comparePassword(oldp)) {
          user.resetPassword(newp);
          res.status(200).json({res:true});
          next();
        }else {
          return res.status(422).json({errors:[{title:'/user/:id',detail:'You entered a Wrong Password.'}]});
        }

      })

});


router.post('/request/reset/password',(req,res,next)=> {
  const { email } = req.body;

  User.findOne({email:email})
      .exec(function(err,user){
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/user/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!user) {
          return res.status(200).json({res:false})
        }

        if(user) {
          const token = jwt.sign({
            _id:user._id
          },keys.SECRET_KEY,{expiresIn: '1d'});

          const url = `https://nameless-peak-94544.herokuapp.com/reset/password/${token}`;
          const email = {
            to: user.email,
            from: 'MyStory',
            subject: 'Reset Your MyStory Password.',
            html: `
            <h3 style="color:#999;padding:5px 25px;border-radius:5px;border:1px solid rgba(0,0,0,0.13);">Someone (hopefully you) has requested a password reset for your MyStory account.<br>
            Follow the link below to set a new password:<br>
            <br>
            <a href="${url}">${url}</a> <br>
            <br>

            If you don't wish to reset your password, disregard this email and no action will be taken.<br>
            <br>

            The MyStory Team<br></h3>
            `
          }

          transport.sendMail(email, (err, info) => {
            console.log(err);

          });


          res.status(200).json({res:true});
          next();
        }

      })
});

router.post('/reset/password',(req,res,next)=>{
  const { token, newp } = req.body;

  if(token) {
    jwt.verify(token,keys.SECRET_KEY,function(err,decoded) {
      if(err) {
        return res.status(422).json({errors:[{title:'/user/:id',detail:'The link has expired. Please request again for password reset.'}]});
      }
      const user = decoded;

      User.findOne({_id:user._id})
          .exec(function(err,user){
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/user/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!user) {
          return res.status(422).json({errors:[{title:'/user/:id',detail:'User Account doesn`t exists.'}]});
        }

          user.resetPassword(newp);
          res.status(200).json({res:true});
          next();

      })

    });
  } else {
    return res.status(422).json({errors:[{title:'/user/:id',detail:'The link has expired. Please request again for password reset.'}]});

  }

});



router.post('/user/image',auth.checkAuth,(req,res,next)=>{

  const {image} = req.body;
  const user = res.locals.user;

  User.findOne({_id:user._id})
      .exec(function(err,user){
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/user/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!user) {
          return res.status(422).json({errors:[{title:'/user/:id',detail:'User Account doesn`t exists.'}]});
        }

        user.addImage(image);
        res.status(200).json({res:true});
        next();
  });
});


router.get('/username/:username',(req,res,next)=>{
  const u = req.params.username.toLowerCase();
  User.findOne({username:u})
      .exec(function(err,user) {
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/user/:id',detail:'Unable to perform operation! Please try again later.'}]});
        }

        if(!user) {
          return res.status(422).json({errors:[{title:'/user/:id',detail:'User with that username doesn`t exists.'}]});
        }

        res.status(200).json({id:user._id});
        next();
      });
});








module.exports = router;
