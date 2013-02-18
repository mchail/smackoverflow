
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , MongoClient = require('mongodb').MongoClient
  , format = require('util').format;



var url = process.env.MONGOURL || "mongodb://localhost:27017/smackoverflow"

MongoClient.connect(url, function(err, db) {
  if(err) throw err;

  console.log("connected");

  var collection = db.collection('test');
  var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

  collection.insert(docs, {w:1}, function(err, result) {
    collection.find().toArray(function(err, items) {});

      var stream = collection.find({mykey:{$ne:2}}).stream();

      stream.on("data", function(item) {
          console.log("MongoDB Item: ");
          console.log(item);
      });

      stream.on("end", function() {});

      collection.findOne({mykey:1}, function(err, item) {});
  });  
})

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
