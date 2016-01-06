angular.module('todoController', [])
.controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
  $scope.formData = {};

  Todos.get()
  .success(function(data) {
    $scope.todos = data;
    console.log('Error: ' + data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });
  console.log('dkaflj');
  $scope.createTodo = function() {
    if (!$.isEmptyObject($scope.formData)) {
      Todos.create($scope.formData)
      console.log('ABC');
      .success(function(data) {
        $scope.formData = {};
        $scope.todos = data;
        console.log('Error: ' + data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    };
    console.log('dfjalsdf');
  };

  $scope.deleteTodo = function(id) {
    Todos.delete(id)
    .success(function(data) {
      $scope.todos = data;
      console.log('Error: ' + data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
  /*
  //get all todos and display on page load
  $http.get('/api/todos')
    .success(function(data){
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

  // on submit send data to API
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data){
        $scope.formData = {}; //clear the form
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

  // delete a todos
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
  */
}]);