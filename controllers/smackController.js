
var Smack = require('../models/smack.js');

exports.new = function(req, res) {
	new Smack({
		author: req.body.author,
		talk: req.body.talk,
		created_at: Date.now(),
		upvotes: 0
	}).save();
};

exports.create = function(req, res) {
	new Smack({
		author: req.body.author,
		talk: req.body.talk,
		created_at: Date.now(),
		upvotes: 0
	}).save();
};

exports.index = function(req, res) {
	Smack.find(function(err, smacks) {
		res.send(smacks);
	});
};

exports.show = function(req, res) {
	Smack.findOne({id: req.params.id}, function(err, smack) {
		res.send(smack);
	});
};
