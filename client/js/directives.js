app.directive('formfield', function() {
  return {
    restrict: 'E', 
    scope: {
      prop: '@'
    },
    transclude: true,
    templateUrl: 'formfield.html',
    replace: true
  }
})
