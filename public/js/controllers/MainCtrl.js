angular.module('WorldlyWisdom')
.controller('MainCtrl', 
  ['$scope', '$routeParams', '$location', 'TotalMaxims',
function($scope, $routeParams, $location, TotalMaxims) {
  var n = parseInt( $location.path().match(/\d{1,3}$/) );
  
  $scope.curMaxim = getCurMaxim();

  $scope.prevMaxim = function() {
    n = decrement(n);
    $scope.curMaxim = getCurMaxim();
    $location.path('/maxims/' + $scope.curMaxim);
  }

  $scope.nextMaxim = function() {
    n = increment(n);
    $scope.curMaxim = getCurMaxim();
    $location.path('/maxims/' + $scope.curMaxim);
  }

  function getCurMaxim() {
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