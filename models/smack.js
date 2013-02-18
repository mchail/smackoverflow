var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

var smack = new Schema({
	talk: String,
	author: String,
	created_at: { type: Date, default: Date.now, index: true },
	upvotes: { type: Number, default: 0, index: true }
});

module.exports = mongoose.model('Smack', smack);
