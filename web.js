var less = require('less-middleware');
var path = require('path');
var express = require('express');
var app = express();

app.configure(function() {
  app.set('view engine', 'jade');

  app.use(less({
    src : '/css/less',
    dest: '/css',
    root: path.join(__dirname, 'public'),
    compress: true
  }));
  app.use(express.static( path.join(__dirname, 'public') ));

  app.use(express.logger('short'));
  app.use(express.bodyParser());
});

// Entry Points
var index = function(req, res) {
  res.render('app.jade', {layout: false});
};

app.get('/', index);

app.get(/^\/maxims\/?/, index);

app.get(/^\/maxims\/\d/, index);

// Start Up!
var PORT = process.env.PORT || 8080; // good odds

module.exports = app;
if (!module.parent) {
  app.listen(PORT);
  console.log('Listening on port ' + PORT);
}