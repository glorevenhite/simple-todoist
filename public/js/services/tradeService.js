angular.module('tradeService', [])

    // super simple service
    // each function returns a promise object 
    .factory('TradeServiceFactory', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/trades');
            },
            create : function(tradeData) {
                return $http.post('/api/trades', tradeData);
            },
            delete : function(id) {
                return $http.delete('/api/trades/' + id);
            }
        }
    }]);