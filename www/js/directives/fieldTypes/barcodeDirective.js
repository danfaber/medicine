(function(){

    angular.module("medicine")
        .directive("barcode", function(){
            return {
                restrict: "E",
                template: "<div class='item item-input item-icon-right'><input ng-model='value.value' type='text'><i ng-click='openBarcodeReader()' class='icon ion-ios7-barcode'></i></div>",
                scope :{
                    value: "="
                },
                controller: function($scope, $cordovaBarcodeScanner) {
                    $scope.openBarcodeReader = function()
                    {
                        $cordovaBarcodeScanner.scan().then(function(imageData) {
                            //success
                            $scope.value.value = imageData.text;
                        }, function(error) {

                        });
                    };
                }
            }
        });

})();

