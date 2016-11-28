var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/entry', {
      templateUrl: '/views/templates/entry.html',
      controller: 'EntryController',
      controllerAs: 'entry'
    })
    .when('/list', {
      templateUrl: '/views/templates/list.html',
      controller: 'ListController',
      controllerAs: 'list'
    })
    .otherwise({
      redirectTo: 'entry'
    });
}]);

app.controller("EntryController", ["$http", function($http) {
  var self = this;
  self.newHero = {};
  self.powers = [];

  getPowers();

  self.addHero = function() {
    console.log('new hero: ', self.newHero);
    //workaround
    self.newHero.power_id = self.newHero.power_id.id;
    console.log('newHero: ', self.newHero);
    $http.post('/heroes', self.newHero)
      .then(function(response) {
        console.log('heroes POST finished.');

      });
  }

  function getPowers() {
    $http.get('/powers')
      .then(function(response) {
        self.powers = response.data;
        console.log('powers GET finished.', self.powers);
        console.log(self.powers[0].name);
      });

  }


}]);

app.controller("ListController", ["$http", function($http) {
  var self = this;
  self.heroes = {};

  getHeroes();

  function getHeroes() {
    console.log('get heroes: ');
    $http.get('/heroes', self.newHero)
      .then(function(response) {
        self.heroes = response.data;
        console.log('heroes GET finished.');
      });
  }

  self.deleteHero = function(heroObj) {
    var id = heroObj.id;
    console.log('hero object id for delete: ', id);
    $http.delete('/heroes/' + id)
      .then(function(response) {
        console.log('DELETE finished. Get herowss again.');
        getHeroes();
      });
  }


}]);
