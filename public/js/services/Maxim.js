angular.module('WorldlyWisdom')
.factory('Maxim', ['TotalMaxims', '$q', '$http', 
function(TotalMaxims, $q, $http) {
  var titles = [];
  var bodies = [];

  getAllTitles();

  return {
    titles: function(cb) {
      if (titles.length == 0) {
        getAllTitles(cb);
      }
      else {
        cb(titles)
      }
    },
    body: function(id, cb) {
      if (!bodies[id]) {
        getMaximBody(id, cb);
      }
      else {
        cb(bodies[id]);
      }
    }
  }

  function getAllTitles(callback) {
    $http.get('/api/maxim/titles')
      .success(function(data) {
        titles = data;
        if (callback) {
          callback(titles);
        }
      })
      .error(function() {
        callback(titles);
      })
  }

  /** The basic idea behind this helper is to prefetch maxims
      before we need them so that it
    **/
  function getMaximBodies(from, to) {
    return $http.get('/api/maxim/' + from + '/thru/' + to)
            .success(function(data) {
              data = angular.fromJson(data);

              for (var i = from; i <= to; i++) {
                bodies[i] = data[i - from];
              }
            })
  }

  function getMaximBody(id, callback) {
    var start = parseInt(id) - 10
      , end   = parseInt(id) + 10
      , promises = [];

    // normalize id
    if (id < 1) {
      id = 1;
    }
    else if (id > TotalMaxims) {
      id = TotalMaxims;
    }

    if (id > 290 || id < 11) {
      promises.push( getMaximBodies(290, TotalMaxims) );
      promises.push( getMaximBodies(1, 10) );
    }
    else {
      range = genRange(id);
      // Our range goes from 1 to 300, so increment start if it is 0
      range.start = range.start === 0 ? 1 : range.start;

      // Only load the maxims if they aren't already loaded
      if (!bodies[range.start] && !bodies[range.end]) {
        promises.push(getMaximBodies(range.start, range.end) );
      }
      else if (!bodies[range.start]) {
        promises.push(getMaximBodies(range.start, id));
      }
      else if (!bodies[range.end]) {
        promises.push(getMaximBodies(id, range.end))
      }
    }

    $q.all(promises).then(function() {
      if (callback) {
        callback(bodies[id]);
      }
    });
  }

  function genRange(n) {
    n = parseInt(n/10);
    return {
      start: (n-1) * 10,
      end  : (n+1) * 10
    }
  }
}]);