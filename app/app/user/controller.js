'use strict ';

app.controller('userCtrl', ['$scope', '$http', '$location', '$rootScope', 'sessionService', '$timeout', function($scope, $http, $location, $rootScope, sessionService, $timeout) {

    // create new user
    $scope.createUser = function() {
        $http({
            method: 'POST',
            data: {
                'name': $scope.name,
                'email': $scope.email,
                'password': $scope.password
            },
            url: 'api/user/createuser.php'
        }).then(function successCallback(response) {
            // user already exists
            if (response.data.trim() === 'exists') {
                sessionService.set('user', false);
                $scope.errormsg = "User Already Exists. Please Sign In.";

                //Remove message after 10 seconds delay
                $timeout(function() {
                    $scope.errormsg = false;
                }, 5000);
            }
            // tell the user new user was created
            else {
                sessionService.set('user', true);
                alert("User Succesfully Created");
                $location.path('/products');
            }
        });
    }

    // Login User
    $scope.getUser = function() {
        $http({
            method: 'POST',
            data: {
                'email': $scope.email,
                'password': $scope.password
            },
            url: 'api/user/getuser.php'
        }).then(function successCallback(response) {
            if (response.data.trim() === 'correct') {
                sessionService.set('user', true);
                $location.path('/products');
            } else {
                sessionService.set('user', false);
                $scope.errormsg = "Invalid Username or Password. Try Again";

                //Remove message after 10 seconds delay
                $timeout(function() {
                    $scope.errormsg = false;
                }, 5000);
            }
        });
    }

}]);