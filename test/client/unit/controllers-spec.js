describe('ListCtrl', function(){
  var listCtrl = null
    , scope = null
    , httpBackend = null

  beforeEach(module('app'))

  beforeEach(inject(function ($httpBackend) {
    $httpBackend.when('GET', '/api/items').respond([{title: 'Cool name'}])
    httpBackend = $httpBackend
  }))

  beforeEach(inject(function($controller, $rootScope, $http, DataService, $resource) {
    scope = $rootScope.$new();
    listCtrl = $controller(ListCtrl, {$scope: scope, DataService: DataService})
    httpBackend.flush()
  }))


  it('scope.items should have a cool name', function() {
    //dump(scope)
    expect(scope.items.length).toBe(1)
    expect(scope.items[0].title).toBe('Cool name')
  });
});