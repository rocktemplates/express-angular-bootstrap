var app = angular.module('app', ['ngResource'])

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {controller: ListCtrl, templateUrl: '/partials/list.html'}) 
    .when('/edit/:id', {controller: EditCtrl, templateUrl: '/partials/details.html'})
    .when('/new', {controller: CreateCtrl, templateUrl: '/partials/details.html'})
    .otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true)
})

app.factory('DataService', function($resource) {
  return $resource('/api/items/:id', {id: '@id'}, {update: {method: 'PUT'}})
})



