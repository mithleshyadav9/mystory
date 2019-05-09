var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Story = require('./story');
var bcrypt = require('bcryptjs');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  password: {
    type: String
  },
  image:{
    type: String
  },
  bio: {
   type:String
  },
  website: {
    type:String
  },
  fname: {
    type: String,
    trim: true
  },
  lname: {
    type: String,
    trim: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  stories: [{type: Schema.Types.ObjectId, ref:'Story'}],
  favourites: [{type: Schema.Types.ObjectId, ref:'Story'}],
  publics: [{type: Schema.Types.ObjectId, ref:'Story'}]
});


UserSchema.plugin(deepPopulate,{
  populate:{
    'publics.writer': {
      select: 'fname lname _id username image public favourites'
    },
    'stories.writer': {
      select: 'fname lname _id username image public favourites'
    },
    'favourites.writer': {
      select: 'fname lname _id username image public favourites'
    }
  }
});




UserSchema.methods.verifyT = function() {
  this.verified = true;
  this.save();
}

UserSchema.methods.chnageUsername = function(username) {
  this.username = username;
  this.save();
  
}

UserSchema.methods.verifyF = function() {
  this.verified = false;
  this.save();
}

UserSchema.methods.checkPublic = function(id) {
  if(this.publics.indexOf(id) > -1) {
    return true;
  } else {
    return false;
  }
}

UserSchema.methods.addPublic = function(id) {
  this.publics.push(id);
  this.save();
}

UserSchema.methods.addStory = function(id) {
  this.stories.push(id);
  this.save();
}

UserSchema.methods.addPublicStory = function(id) {
  this.publics.push(id);
  this.stories.push(id);
  this.save();
}

UserSchema.methods.removePublic = function(id) {
  var i = this.publics.indexOf(id);
  this.publics.splice(i,1);
  this.save();
}

UserSchema.methods.removeStory = function(id) {
  var i = this.stories.indexOf(id);
  this.stories.splice(i,1);
  this.save();
}

UserSchema.methods.checkFavourite = function(id) {
  if(this.favourites.indexOf(id) > -1) {
    return true;
  } else {
    return false;
  }
}

UserSchema.methods.addFavourite = function(id) {
  this.favourites.push(id);
  this.save();
}

UserSchema.methods.removeFavourite = function(id) {
  var i = this.favourites.indexOf(id);
  this.favourites.splice(i,1);
  this.save();
}

UserSchema.methods.storyRemove = function(id) {
  if(this.stories.indexOf(id) > -1) {
    var i = this.stories.indexOf(id);
    this.stories.splice(i,1);
  }

  if(this.publics.indexOf(id) > -1) {
    var i = this.publics.indexOf(id);
    this.publics.splice(i,1);
  }

  if(this.favourites.indexOf(id) > -1) {
    var i = this.favourites.indexOf(id);
    this.favourites.splice(i,1);
  }

  this.save();
}


UserSchema.methods.verify = function() {
  this.verified = true;
  this.save();
}

UserSchema.methods.unVerify = function() {
  this.verified = false;
  this.save();
}

UserSchema.methods.addFname = function(fname) {
  this.fname = fname;
  this.save();
  return;
}

UserSchema.methods.addLname = function(lname) {
  this.lname = lname;
  this.save();
  return;
}

UserSchema.methods.addBio = function(bio) {
  this.bio = bio;
  this.save();
  return;
}

UserSchema.methods.addWebsite = function(website) {
  this.website = website;
  this.save();
  return;
}

UserSchema.methods.addImage = function(image) {
  this.image = image;
  this.save();
  return;
}


UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password,this.password);
}

UserSchema.methods.resetPassword = function(newPassword) {
  var user = this;

  bcrypt.genSalt(10,function(err,salt) {
    if(err) {
    return  console.log(err);
    }

    bcrypt.hash(newPassword,salt,function(err,hash) {
      if(err) {
        return console.log(err);
      }

      user.password = hash;
      return user.save();

    })
  })
}



module.exports = mongoose.model('User',UserSchema);
