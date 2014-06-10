var fs = require('fs');

var Maxim = module.exports = function Maxim() {

};

Maxim.titles = Maxim.prototype.titles = function() {
  return allMaximTitles();
}

Maxim.bodies = Maxim.prototype.bodies = function() {
  return allMaximBodies();
}

Maxim.bodies.range = function(x, y) {
  return maximBodiesRange(x, y);
}

Maxim.bodies.from = function(x) {
  return {
    to: function(y) {
      return maximBodiesRange(x, y);
    }
  }
}

Maxim.TOTAL_MAXIMS = 5;


/** Private Helpers **/

/** `maxims` is an array of maxim objects, each of the form
      {
        id: Number,
        title: String,
        body: String
      }

    The first value is set to null so that the indexing is much 
    more natural; i.e., when we want to get the first maxim, we
    can simply use maxims[1].
  **/
var maxims = [null];

function loadAllMaxims() {
  if (maxims.length > 1) return;

  var maxims_file = fs.readFileSync('maxims/maxims.json')
    , maxims_obj = JSON.parse(maxims_file);

  for (var i in maxims_obj) {
    if (maxims_obj.hasOwnProperty(i)) {
      maxims[i] = maxims_obj[i];
    }
  }
}

function allMaximTitles() {
  loadAllMaxims();

  var titles = [null];

  for (var i = 1; i < maxims.length; i++) {
    titles[i] = maxims[i].title;
  }

  return titles;
}

function allMaximBodies() {
  loadAllMaxims();

  var bodies = [null];

  for (var i = 1; i < maxims.length; i++) {
    bodies[i] = maxims[i].body;
  }

  return bodies;
}

function maximBodiesRange(x, y) {
  loadAllMaxims();

  var bodies = [];

  // 
  if (x < 1) {
    x = 1;
  }
  if (y > Maxim.TOTAL_MAXIMS) {
    y = Maxim.TOTAL_MAXIMS;
  }

  for (var i = x; i <= y; i++) {
    bodies.push(maxims[i].body);
  }

  return bodies;
}