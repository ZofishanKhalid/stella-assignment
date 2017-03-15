'use strict'

app.controller('productsCtrl', ['$scope', '$http', '$location', '$rootScope', 'sessionService', '$timeout', function($scope, $http, $location, $rootScope, sessionService, $timeout) {

    // Read all products
    $scope.getAll = function() {
        $http({
            method: 'GET',
            url: 'api/product/read.php'
        }).then(function successCallback(response) {
            $scope.products = response.data.records;
        });
    }

    // Delete a product
    $scope.deleteProduct = function(id) {

        // ask if user is sure to delete the record
        if (confirm("Are you sure you want to Delete this Product?")) {
            $http({
                method: 'POST',
                data: { 'id': id },
                url: 'api/product/delete.php'
            }).then(function successCallback(response) {
                // tell the user product was deleted
                $scope.successmsg = "Product Successfully Deleted.";
                // refresh the list
                $scope.getAll();
            });
        }

        //Remove message after 10 seconds delay
        $timeout(function() {
            $scope.successmsg = false;
            $scope.errormsg = false;
        }, 5000);

    }

    // Update product record / save changes
    $scope.updateProduct = function() {
        //ask if user is sure to update product
        if (confirm("Are you sure you want to Update this Product?")) {
            $http({
                method: 'POST',
                data: {
                    'id': $scope.id,
                    'name': $scope.name,
                    'description': $scope.description,
                    'price': $scope.price
                },
                url: 'api/product/update.php'
            }).then(function successCallback(response) {

                if (response.data.trim() === 'updated') {
                    // tell the user new product was updated
                    $scope.successmsg = "Product Successfully Updated.";
                    // refresh the product list
                    $scope.getAll();
                } else {
                    // tell the user product was not updated
                    $scope.errormsg = "Product was not updated.";
                    // refresh the product list
                    $scope.getAll();
                }

                //Remove message after 10 seconds delay
                $timeout(function() {
                    $scope.successmsg = false;
                    $scope.errormsg = false;
                }, 5000);

                // close modal
                $('#modal-product-form').modal('hide');
                // clear modal content
                $scope.clearForm();
                // refresh product list
                $scope.getAll();
            });
        }
    }

    // retrieve record to fill out the form
    $scope.readOne = function(id) {

        // change modal title
        $('#modal-product-title').text("Edit Product");

        // show udpate product button
        $('#btn-update-product').show();
        // show create product button
        $('#btn-create-product').hide();

        // post id of product to be edited
        $http({
            method: 'POST',
            data: { 'id': id },
            url: 'api/product/read_one.php'
        }).then(function successCallback(response) {
            // put the values in form
            $scope.id = response.data[0]["id"];
            $scope.name = response.data[0]["name"];
            $scope.description = response.data[0]["description"];
            $scope.price = response.data[0]["price"];

            // show modal
            $('#modal-product-form').modal('show');
        });
    }

    $scope.showCreateForm = function() {

        // clear form
        $scope.clearForm();

        // change modal title
        $('#modal-product-title').text("Add Product");
        // hide update product button
        $('#btn-update-product').hide();
        // show create product button
        $('#btn-create-product').show();
    }

    // clear variable / form values
    $scope.clearForm = function() {
        $scope.id = "";
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
    }

    // create new product
    $scope.createProduct = function() {
        $http({
            method: 'POST',
            data: {
                'name': $scope.name,
                'description': $scope.description,
                'price': $scope.price
            },
            url: 'api/product/create.php'
        }).then(function successCallback(response) {
            if (response.data.trim() === 'created') {
                // tell the user new product was created
                $scope.successmsg = "Product Successfully Created.";
            } else {
                // tell the user new product was not created
                $scope.errormsg = "Product Not Created.";
            }

            //Remove message after 10 seconds delay
            $timeout(function() {
                $scope.successmsg = false;
                $scope.errormsg = false;
            }, 5000);

            // close modal
            $('#modal-product-form').modal('hide');
            // clear modal content
            $scope.clearForm();
            // refresh the list
            $scope.getAll();
        });
    }

    // Logout of Application
    $scope.logout = function(id) {
        // ask for confirmation to logout
        if (confirm("Are you sure you want to logout?")) {
            $http({
                url: 'api/user/logout.php'
            }).then(function successCallback(response) {
                sessionService.destroy('user'); //destroy user session to restrict to login permission
                $location.path('/login');
            });
        }
    }
}]);