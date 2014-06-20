var less = require('less-middleware')
  , path = require('path')
  , express = require('express')
  , compress = require('compression')
  , Maxim = require('./maxim')
  
  , app = express();

app.configure(function() {
  app.set('view engine', 'jade');

  app.use(less({
    src : '/css/less',
    dest: '/css',
    root: path.join(__dirname, 'public'),
    compress: true
  }));

  app.use(compress());
  app.use(express.static( path.join(__dirname, 'public') ));

  app.use(express.logger('short'));
  app.use(express.bodyParser());
});



// Entry Points
var index = function(req, res) {
  res.render('app.jade', {layout: false});
};

/** The following routes are enumerated within the angular app
    itself, so we want to render the main index page and give
    control over to the client-side app.
  **/
app.get('/', index);
app.get(/^\/maxims\/?/, index);
app.get(/^\/maxims\/\d/, index);


// API
app.get('/api/maxim/titles', function(req, res) {
  res.type('json');
  res.json(Maxim.titles());
});
app.get('/api/maxim/:from/thru/:to', function(req, res) {
  var start = parseInt(req.params.from)
    , end   = parseInt(req.params.to);

  res.type('json');
  res.json(Maxim.bodies.from(start).to(end));
});


// Templates
app.get('/views/title-page', function(req, res) {
  res.render('title_page.jade', {layout: false});
})

app.get('/views/maxim', function(req, res) {
  res.render('maxim.jade', {layout: false});
})


// Start Up!
var PORT = process.env.PORT || 8080; // good odds

module.exports = app;
if (!module.parent) {
  app.listen(PORT);
  console.log('Listening on port ' + PORT);
}