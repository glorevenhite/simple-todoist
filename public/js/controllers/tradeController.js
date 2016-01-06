angular.module('tradeController', [])

// inject TradeServiceFactory
.controller('tradeMainController', ['$scope', '$http', 'TradeServiceFactory', function($scope, $http, TradeServiceFactory) {
    $scope.formData = {
      date      : new Date().toISOString().split("T")[0],  
      quantity  : 10,
      fee       : 0.0015,
      margin    : 0.5,
      tax       : 0 
    };

  /* Default */
  TradeServiceFactory.get()
  // on success
  .success(function(data) {
    $scope.trades = data;
  })

  // on error
  .error(function(data) {
    console.log('Error: ' + data);
  });

  /* longPosition() */
  $scope.longPosition = function() {
    if (!$.isEmptyObject($scope.formData)) {
      $scope.formData.position = true,

      TradeServiceFactory.create($scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.trades = data;
        console.log('Error: ' + data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    };
  };

  $scope.shortPosition = function() {
    if (!$.isEmptyObject($scope.formData)) {
      $scope.formData.position = false;
      $scope.formData.tax = 0.001;

      TradeServiceFactory.create($scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.trades = data;
        console.log('Error: ' + data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    };
    console.log('abc');
  };

  $scope.deleteTrade = function(id) {
    TradeServiceFactory.delete(id)
    .success(function(data) {
      $scope.trades = data;
      console.log('Error: ' + data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
}]);