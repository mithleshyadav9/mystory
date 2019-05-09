var mongodb = require('mongodb');
var mongoose = require('mongoose');
var keys  = require('../keys');

mongoose.Promise = global.Promise;

  mongoose.connect(keys.MONGOURI,{
    useNewUrlParser: true
  });





module.exports = mongoose;
