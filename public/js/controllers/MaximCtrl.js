angular.module('WorldlyWisdom')
.controller('MaximCtrl', 
  ['$scope', '$routeParams', 'Maxim', '$location', 'TotalMaxims', 
function($scope, $routeParams, Maxim, $location, TotalMaxims) {
  $scope.numero = normalizeId();

  Maxim.titles(function(titles) {
    $scope.titles = titles;
  })
  
  Maxim.body($scope.numero, function(maxim) {
    $scope.body = maxim;
  });

  function normalizeId() {
    var id = $routeParams.id;

    /** Wrap around if id is lesser or greater than the
        range 1-TotalMaxims.
      **/
    if (id < 1) {
      id = TotalMaxims;
      $location.path('/maxims/'+id);
    }
    else if (id > TotalMaxims) {
      id = 1;
      $location.path('/maxims/'+id);
    }
    else {
      return id;
    }
  }
}])