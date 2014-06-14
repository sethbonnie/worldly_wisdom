angular.module('WorldlyWisdom')
.controller('MenuCtrl', 
  ['$scope', '$location', 'Maxim',
function($scope, $location, Maxim) {
  Maxim.titles(function(title_array) {
    $scope.titles = title_array;
  })
}])