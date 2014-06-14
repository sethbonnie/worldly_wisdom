angular.module('WorldlyWisdom')
.controller('MenuCtrl', 
  ['$scope', '$location', 'Maxim',
function($scope, $location, Maxim) {
  $scope.loadMaxim = function(new_index) {
    var cur_index = curMaxim()
      , maxim_elem = document.getElementsByClassName('maxim');

    if (cur_index < new_index) {
      angular.element(maxim_elem)
        .removeClass('prev')
        .addClass('next');
    }
    else if (cur_index > new_index) {
      angular.element(maxim_elem)
        .addClass('prev')
        .removeClass('next');
    }
    $scope.expandMenu = false;
    $location.path('/maxims/' + new_index);
  };

  Maxim.titles(function(title_array) {
    $scope.titles = title_array;
  });

  function curMaxim() {    
    return parseInt($location.path().match(/\d{1,3}$/)[0]);
  }
}])