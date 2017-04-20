var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    var refresh = function () {
        $http.get('/contactlist').then(function (response) {
            $scope.data = response.data;
            $scope.contact.name = "";
            $scope.contact.email = "";
            $scope.contact.number = "";
        });
    };

    refresh();

    $scope.addcontact = function(){
        //console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).then(function (response) {
            refresh();
        });
    };

    $scope.remove = function(id){
        $http.delete('/contactlist/'+id).then(function (response){
            refresh();
        });
        //console.log(id);
    };

    $scope.edit = function(id){
        $http.get('/contactlist/'+id).then(function (response) {
            $scope.contact = response.data;
        });
    };

    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/contactlist/'+$scope.contact._id, $scope.contact).then(function (response) {
            refresh();
        });
    }
});