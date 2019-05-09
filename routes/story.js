
var router = require('express').Router();
var Story = require('../models/story');
var User = require('../models/user');
var {ObjectId} = require('mongodb');

var auth = require('../middleware/auth');


router.get('/all',(req,res,next)=>{

console.log(req.query)
let {skip,limit} = req.query;
if(skip) {
  skip = Number(skip.trim());
} else {
  skip = 0;
}

if(limit) {
limit = Number(limit.trim());
}else {
  limit = 0;
}


Story.find({})
      .sort({wroteOn:-1})
      .limit(limit)
      .skip(skip)
      .exec(function(err,stories) {
      if(err) {
        return;
      }

      res.json(stories)
      next();

     })
});


router.patch('/story/:id',auth.checkAuth,(req,res,next)=>{
  const id = req.params.id;
  const {title,description,public} = req.body;
  const user = res.locals.user;
  if(!ObjectId.isValid(id)) {
    return res.status(422).json({errors:[{title:'/story/:id',detail:'Story associated with that Id doesn`t exists.'}]});
  }


  Story.findOne({_id:id})
       .populate('writer')
       .exec(function(err,story) {
         if(err) {
           console.log(err);
           return res.status(422).json({errors:[{title:'/story/:id',detail:'Unable to perform operation! Please try again later.'}]});

         }

         if(!story) {
           return res.status(422).json({errors:[{title:'/story/:id',detail:'Story is no more available.'}]});
         }

         if(story.writer._id.toString() !== user._id.toString() ) {
           return res.status(422).json({errors:[{title:'/story/:id',detail:'You\'re not authorized to perform this operation.'}]});
         }

         story.title = title;
         story.description = description;
         story.public = public;
         story.save();
         res.status(200).json({res:true,msg:'Story has been Saved.'});
         next();

       })

});


router.get('/editstory/:id',auth.checkAuth,(req,res,next)=>{
  const id = req.params.id;
  const user = res.locals.user;


  if(!ObjectId.isValid(id)) {
    return res.status(422).json({errors:[{title:'/story/:id',detail:'Story associated with that Id doesn`t exists.'}]});

  }

  Story.findOne({_id:id})
       .populate('writer')
       .exec(function(err,story) {
         if(err) {
           console.log(err);
           return res.status(422).json({errors:[{title:'/story/:id',detail:'Unable to perform operation! Please try again later.'}]});

         }

         if(!story) {
           return res.status(422).json({errors:[{title:'/story/:id',detail:'Story is no more available.'}]});
         }

          if(story.writer._id.toString() !== user._id.toString()) {
            return res.status(422).json({errors:[{title:'/story/:id',detail:'You\'re not authorized to access this page.'}]});
          }

         res.status(200).json(story);
         next();

       })

});



router.get('/story/:id',auth.checkUser,(req,res,next)=>{
  const id = req.params.id;


  if(!ObjectId.isValid(id)) {
    return res.status(422).json({errors:[{title:'/story/:id',detail:'Story associated with that Id doesn`t exists.'}]});

  }

  Story.findOne({_id:id})
       .populate('writer favBy')
       .exec(function(err,story) {
         if(err) {
           console.log(err);
           return res.status(422).json({errors:[{title:'/story/:id',detail:'Unable to perform operation! Please try again later.'}]});

         }

         if(!story) {
           return res.status(422).json({errors:[{title:'/story/:id',detail:'Story is no more available.'}]});
         }

         if(res.locals.user) {
           if(story.public === false && res.locals.user._id.toString() !== story.writer._id.toString()) {
             return res.status(422).json({errors:[{title:'/story/:id',detail:'You\'re not authorized to access this page.'}]});
           }
         }

         if(story.public === false) {
           if(!res.locals.user) {
             return res.status(422).json({errors:[{title:'/story/:id',detail:'You\'re not authorized to access this page.'}]});
           }
         }

         res.status(200).json(story);
         next();

       })

});


router.get('/stories',auth.checkAuth, (req, res, next) => {
  const user = res.locals.user;
  let {skip,limit} = req.query;
if(skip) {
  skip = Number(skip.trim());
} else {
  skip = 0;
}

if(limit) {
limit = Number(limit.trim());
}else {
  limit = 0;
}


  Story.find({writer:user._id})
       .populate('writer')
       .sort({wroteOn: -1})
       .limit(limit)
       .skip(skip)
       .exec(function(err,stories) {
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/stories/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!stories || stories.length === 0) {
          return res.status(422).json({errors:[{title:'/stories/:id',detail:'We would be glad to see your stories here.'}]});
        }

        res.status(200).json(stories);
        next();
      });
});


router.get('/stories/:id', (req, res, next) => {
  const id = req.params.id;
  let {skip,limit} = req.query;
if(skip) {
  skip = Number(skip.trim());
} else {
  skip = 0;
}

if(limit) {
limit = Number(limit.trim());
}else {
  limit = 0;
}

  if(!ObjectId.isValid(id)) {
    return res.status(422).json({errors:[{title:'/stories/:id',detail:'User associated with that Id doesn`t exists.'}]});

  }

  Story.find({writer:id,public:true})
       .populate('writer')
       .sort({wroteOn: -1})
       .limit(limit)
       .skip(skip)
       .exec(function(err,stories) {
        if(err) {
          console.log(err);
          return res.status(422).json({errors:[{title:'/stories/:id',detail:'Unable to perform operation! Please try again later.'}]});

        }

        if(!stories || stories.length === 0) {
          return res.status(422).json({errors:[{title:'/stories/:id',detail:'No Story has been made Public Yet.'}]});
        }

        res.status(200).json(stories);
        next();
      });
});



router.get('/pstories',(req,res,next)=>{
  let {skip,limit} = req.query;
if(skip) {
  skip = Number(skip.trim());
} else {
  skip = 0;
}

if(limit) {
limit = Number(limit.trim());
}else {
  limit = 0;
}
  Story.find({public:true})
       .populate('writer')
       .sort({wroteOn: -1})
       .skip(skip)
       .limit(limit)
       .exec(function(err,stories) {
         if(err) {
           console.log(err);

           return res.status(422).json({errors:[{title:'/Pstories',detail:'Unable to Perform the operation! Please try again later.'}]})

         }

         if(!stories || stories.length === 0) {
           return res.status(422).json({errors:[{title:'/Pstories',detail:'Public Stories will appear here.'}]})
         }

         res.status(200).json(stories);
         next();

       })
});


router.post('/write',auth.checkAuth,(req,res,next) => {
    const { title, description, public } = req.body;
    const user = res.locals.user;


    if(title === '' || description === '' ) {
      return res.status(422).json({errors:[{title:'/write',detail:'You cannot leave the field(s) empty..!'}]});
    }


    const story = new Story({
      writer: user._id,
      title: title,
      description: description,
      public: public
    });


    story.save()
         .then(()=>{
          return  User.findOne({_id:user._id})
                 .exec(function(err,u) {
                   if(err) {
                     console.log(err);

                     return res.status(422).json({errors:[{title:'/write',detail:'Unable to Perform the operation! Please try again later.'}]})

                   }

                   if(!u) {
                     return res.status(422).json({errors:[{title:'/write',detail:'Unable to Perform the operation! Please try again later.'}]})
                   }


                   if(story.public) {
                     u.addPublicStory(story._id);
                   } else {
                      u.addStory(story._id);
                   }



                   return res.status(200).json({story:story,id:story._id,res:true,msg: 'Story has been added Successfully...!'});

                 })
          })
         .catch((err)=>{
           console.log(err);
           return res.status(422).json({errors:[{title:'/write',detail:'Unable to Perform the operation! Please try again later.'}]})
         });
});


router.get('/manage', ( req, res, next ) => {
  const user = {
    id: '5c5bcf082c137b3a344614c2'
  };

  Story.find({writer:user.id})
       .populate('writer')
       .exec(function(err,stories) {
         if(err) {
           console.log(err);
           return res.status(422).send({errors:[{title:'/delete/:id',detail:'Unable to Perform the operation! Please try again later.'}]});

         }

         if(!stories) {
           return res.status(422).send({errors:[{title:'/manage',detail:'No Stories has been written Yet...!'}]});
       }

         res.status(200).json(stories);
         next();
       });

});


router.delete('/delete/:id',auth.checkAuth, (req, res, next) => {
  const id = req.params.id;

  const user = res.locals.user;

  if(!ObjectId.isValid(id)) {
    return res.status(422).send({errors:[{title:'/delete/:id',detail:'The Story Id is not valid.'}]});

  }

  Story.findOne({_id:id})
       .exec(function(err, story) {
         if(err) {
           console.log(err);
           return res.status(422).send({errors:[{title:'/delete/:id',detail:'Unable to Perform the operation! Please try again later.'}]});


         }

         if(!story) {
           return res.status(422).send({errors:[{title:'/delete/:id',detail:'Story is no more available.'}]});

         }



         if(story.writer.toString() !== user._id.toString()) {
           return res.status(422).send({errors:[{title:'/delete/:id',detail:'You are not authorized to perform this operation.'}]});

         }

         story.remove(function(err) {
           if(err) {
             console.log(err);
             return res.status(422).send({errors:[{title:'/delete/:id',detail:'Unable to Perform the operation! Please try again later.'}]});

           }
           User.findOne({_id:user._id})
               .exec(function(err,user) {
                 if(err) {
                   return res.status(422).send({errors:[{title:'/delete/:id',detail:'Unable to Perform the operation! Please try again later.'}]});

                 }

                 user.storyRemove(id);
               })
           return res.status(200).json({res:true,msg:'Story has been Deleted.'})
         });
       })

});

router.patch('/favourite/:id',auth.checkAuth, ( req, res, next ) => {
  const id = req.params.id;

  const user = res.locals.user;


  if(!ObjectId.isValid(id)) {
    return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Story Id is invalid.'}]});
  }

  Story.findOne({_id:id})
       .exec(function(err,story) {
         if(err) {
           console.log(err);
           return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Unable to Perform the operation! Please try again later.'}]});


         }

         if(!story) {
           return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Sorry! We\'re unable to find the Story.'}]});

         }

         if(story.writer.toString() !== user._id.toString() && !(story.public)) {
           return res.status(422).json({res:false,msg: 'You\'re not authorized to perform this operation.'});
         }


         if(story.checkFavBy(user._id)) {
            story.removeFavBy(user._id)
         }else {
            story.addFavBy(user._id)
         }


         User.findOne({_id:user._id})
             .exec(function(err,u) {

               if(err) {
                 console.log(err);
                 return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Unable to Perform the operation! Please try again later.'}]});

               }

               if(!u) {
                 return res.status(422).send({errors:[{title:'/favourite/:id',detail:'No User found.'}]});
               }

               if(u.checkFavourite(id)) {
                 u.removeFavourite(id);

                 return res.status(200).json({res:false,msg:'Story has been removed from favourites.'});
               }else {
                 u.addFavourite(id);
                 return res.status(200).json({res:true,msg:'Story has been added to favourites.'});
               }
             })



       });
});



router.patch('/public/:id',auth.checkAuth, ( req, res, next ) => {
  const id = req.params.id;

  const user = res.locals.user;


  if(!ObjectId.isValid(id)) {
    return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Story Id is invalid.'}]});
  }

  Story.findOne({_id:id})
       .exec(function(err,story) {
         if(err) {
           console.log(err);
           return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Unable to Perform the operation! Please try again later.'}]});


         }

         if(!story) {
           return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Sorry! We\'re unable to find the Story.'}]});

         }

         if(story.writer.toString() !== user._id.toString()) {
           return res.status(422).json({res:false,msg: 'You\'re not authorized to perform this operation.'});
         }

         if(story.public === true) {
           story.notPublic();
         } else {
           story.makePublic();
         }


         User.findOne({_id:user._id})
             .exec(function(err,u) {

               if(err) {
                 console.log(err);
                 return res.status(422).send({errors:[{title:'/favourite/:id',detail:'Unable to Perform the operation! Please try again later.'}]});

               }

               if(!u) {
                 return res.status(422).send({errors:[{title:'/favourite/:id',detail:'No User found.'}]});
               }

               if(u.checkPublic(id)) {
                 u.removePublic(id);


                 return res.status(200).json({res:false,msg:'Story has been set to Only Me.'});
               }else {
                 u.addPublic(id);
                 return res.status(200).json({res:true,msg:'Story has been set to Public.'});
               }
             })



       });
});


module.exports = router;
