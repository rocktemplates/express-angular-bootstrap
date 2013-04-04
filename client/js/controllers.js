

function CreateCtrl ($scope, $location, DataService) {
  $scope.action = 'Add'
  $scope.save = function() {
    DataService.save($scope.item, function() {
      $location.path('/')
    })
  }  
}

function ListCtrl ($scope, $http, DataService) {
  $scope.items = Service.query()
  $scope.index = -1
  $scope.selectedId = -1; //actual id of selected car


  $scope.select = function(i) {
    $scope.index = i
    $scope.selectedId = $scope.items[i].id
  }

  $scope.delete = function() {
    if (index >= 0) {
      DataService.delete({id: $scope.items[index].id})
      $scope.items.splice(index, 1)
    }
  }
}

function EditCtrl ($scope, $location, $routeParams, DataService) {
  var id = $routeParams.id
  $scope.get = DataService.get({id: id})
  $scope.action = "Update"


  $scope.save = function() {
    DataService.update({id: id}, $scope.item, function() {
      $location.path('/')
    })
  }
}
