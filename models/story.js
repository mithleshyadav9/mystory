var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var StorySchema = new Schema({
writer: {type: Schema.Types.ObjectId, ref:'User'},
title: {type:String,trim:true},
description:{type:String,trim:true},
wroteOn:{type:Date, default: Date.now},
public: {type:Boolean, default:false},
favBy: [{type:Schema.Types.ObjectId, ref:'User'}]
});



StorySchema.methods.makePublic = function() {
  this.public = true;
  this.save();
}

StorySchema.methods.notPublic = function() {

  this.public = false;
  this.save();
}


StorySchema.methods.checkFavBy = function(id) {
	const i = this.favBy.indexOf(id);

	if(i > -1) {
		return true
	}

	return false;
}

StorySchema.methods.addFavBy = function(id) {
this.favBy.push(id);
return this.save();
}

StorySchema.methods.removeFavBy = function(id) {
	const i = this.favBy.indexOf(id);
	if(i > -1) {
		this.favBy.splice(i,1);
		this.save();
	}
	return;

}






module.exports = mongoose.model('Story',StorySchema);
