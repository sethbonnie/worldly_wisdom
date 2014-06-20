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
      , promises = []
      , id = parseInt(id);

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
      var lower_bound
        , higher_bound
        , i;

      // lower bound
      for (i = id; i > id-10; i--) {
        if (bodies[i]) {
          break;
        }
      }
      lower_bound = i+1;

      // higher bound
      for (i = id; i < id+10; i++) {
        if (bodies[i]) {
          break;
        }
      }
      higher_bound = i-1;

      promises.push(getMaximBodies(lower_bound, higher_bound));
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