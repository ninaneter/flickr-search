var app = angular.module('app', []);

app.controller('ctrl', function($scope, $http) {
  var initScope = function() {
    $scope.data = {
      tag: '',
      results: [],
      limit: {value: 20, label: '20'},
      limitOptions: [{value: 5, label: '5'}, {value: 10, label: '10'}, {value: 20, label: '20'}]
    };
  };

  window.jsonFlickrFeed = function(data) {
    var diff;

    if (data.items.length > $scope.data.limit.value){
      diff = data.items.length - $scope.data.limit.value;
      data.items.splice(data.items.length - diff, diff);
    }
     
    $scope.data.results = data.items;
  };

  $scope.search = function() {
    var url = 'http://www.flickr.com/services/feeds/photos_public.gne?tags=' + $scope.data.tag + '&format=json&callback=jsonFlickrFeed';
    $http.jsonp(url);
  };

  var init = function() {
   initScope(); 
  }();
});
