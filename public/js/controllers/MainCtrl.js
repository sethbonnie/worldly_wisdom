angular.module('WorldlyWisdom')
.controller('MainCtrl', 
  ['$scope', '$routeParams', '$location', 'TotalMaxims', '$window',
function($scope, $routeParams, $location, TotalMaxims, $window) {
  var n = parseInt( $location.path().match(/\d{1,3}$/) );
  
  $scope.curMaxim = getCurMaxim();

  $scope.prev = false;
  $scope.next = false;

  $scope.prevMaxim = function() {

    $scope.prev = true;
    $scope.next = false;

    $scope.curMaxim = decrement( getCurMaxim('prev') );

    $location.path('/maxims/' + $scope.curMaxim);
  }

  $scope.nextMaxim = function() {

    $scope.prev = false;
    $scope.next = true;

    $scope.curMaxim = increment( getCurMaxim('next') );
    $location.path('/maxims/' + $scope.curMaxim);
  }

  /** Events **/
  
  angular.element($window).bind('keydown', function(e) {
    if (e.keyCode == 37) {
      // Left Arrow
      $scope.prevMaxim();
      $scope.$apply();
      e.preventDefault();
    }
    else if (e.keyCode == 39) {
      // Right Arrow 
      $scope.nextMaxim();
      $scope.$apply();
      e.preventDefault();
    }
  });

  /** Helpers **/

  function getCurMaxim(dir) {
    var match = $location.path().match(/\d{1,3}$/);
    if (!match && dir == 'prev') {
      n = TotalMaxims;
    }
    else if (!match && dir == 'next') {
      n = 1;
    }
    else if (match) {
      n = parseInt(match[0]);
    }
    return n >= 1 && n <= TotalMaxims ? n : 1;
  }

  function increment(n) {
    n++;
    if (n > TotalMaxims)
      n = 1;
    return n;
  }

  function decrement(n) {
    n--;
    if (n < 1)
      n = 300;
    return n;
  }
}])