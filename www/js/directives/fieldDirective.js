(function(){

    angular.module("medicine")
        .directive("field",[function(fieldType){
            return {
                restrict: "E",
                templateUrl: "templates/directives/field.html",
                scope: {
                    recordField: "=",
                    recordDefinition: "=",
                    dirty: "="
                },
                controller: controller
            }
        }]);

    var controller = function($scope, $timeout, $cordovaBarcodeScanner)
    {
        $scope.changeToggle = function()
        {
            $scope.dirty = true;

            if ($scope.recordField.fieldDefinition.fieldType.name === "boolean") { return; }

            $scope.recordField.data.values = ($scope.recordField.data.isChecked)
                ? [{
                    value: $scope.recordField.fieldDefinition.fieldType.defaultValue,
                    index: 0
                    }]
                : [];
        };

        $scope.addNewValue = function()
        {
            $scope.dirty = true;

            $scope.recordField.data.values.push(
                {
                    value: $scope.recordField.fieldDefinition.fieldType.defaultValue,
                    index: $scope.recordField.data.values.length
                }

            );
        };


        $scope.setFocus = function($event)
        {
            $timeout(function(){
                var firstItem = angular.element($event.target)[0].nextElementSibling.children[0].querySelector('input');
                var $firstItem = angular.element(firstItem)[0];
                $firstItem.focus();
            });
        };

        $scope.deleteItem = function(index){
            $scope.recordField.data.values.splice(index, 1)
        };

        $scope.makeDirty = function()
        {
            $scope.dirty = true;
        };

        $scope.openBarcodeReader = function()
        {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                //success
                $scope.value.value = imageData.text;
            }, function(error) {

            });
        };


    }
})();