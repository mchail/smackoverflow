
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , MongoClient = require('mongodb').MongoClient
  , mongoose = require('mongoose')
  , format = require('util').format;

var smack = require('./models/smack.js');



var mongoUrl = process.env.MONGOURL || "mongodb://localhost/smackoverflow"

mongoose.connect(mongoUrl);

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

var smackController = require('./controllers/smackController.js');

app.get('/', routes.index);
app.post('/smack', smackController.create);
app.get('/smacks', smackController.index);
app.get('/smack/:id', smackController.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
